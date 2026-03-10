import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from 'src/shared/pagination.model';
import { ConversationEntity } from './entity/conversation.entity';
import { Conversation } from './model/conversation.model';
import { ConversationStatus } from './model/conversation-status.enum';
import { CreateConversationRequest } from './request/create-conversation.request';
import { ListConversationsRequest } from './request/list-conversations.request';
import { RenameConversationTitleRequest } from './request/rename-conversation-title.request';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
  ) {}

  async listConversations(
    userId: string,
    request: ListConversationsRequest,
  ): Promise<Pagination<Conversation>> {
    const { page = 1, limit = 20, search, status, includeArchived = false } = request;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { userId };

    if (status) {
      where.status = status;
    } else if (!includeArchived) {
      where.status = In([ConversationStatus.ACTIVE, ConversationStatus.INACTIVE]);
    }

    if (search?.trim()) {
      where.title = Like(`%${search.trim()}%`);
    }

    const [conversations, total] = await this.conversationRepository.findAndCount({
      where,
      order: { lastUpdate: 'DESC' },
      skip,
      take: limit,
    });

    return new Pagination(
      conversations.map((conversationEntity) => Conversation.fromEntityToModel(conversationEntity)),
      total,
      page,
      limit,
    );
  }

  async createConversation(
    userId: string,
    request: CreateConversationRequest,
    status: ConversationStatus = ConversationStatus.INACTIVE,
  ): Promise<Conversation> {
    const conversation = this.conversationRepository.create({
      conversationId: `conv_${uuidv4()}`,
      userId,
      title: request?.title?.trim() || this.getDefaultTitle(),
      status,
    });

    const savedConversation = await this.conversationRepository.save(conversation);
    return Conversation.fromEntityToModel(savedConversation);
  }

  async getConversationByIdForUser(conversationId: string, userId: string): Promise<Conversation> {
    const conversationEntity = await this.getConversationEntityByIdForUser(conversationId, userId);
    return Conversation.fromEntityToModel(conversationEntity);
  }

  async getConversationEntityByIdForUser(
    conversationId: string,
    userId: string,
  ): Promise<ConversationEntity> {
    const conversation = await this.conversationRepository.findOne({
      where: { conversationId, userId },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} was not found for this user`);
    }

    return conversation;
  }

  async getActiveConversationEntityByUser(userId: string): Promise<ConversationEntity | null> {
    return this.conversationRepository.findOne({
      where: {
        userId,
        status: ConversationStatus.ACTIVE,
      },
    });
  }

  async findMostRecentInactiveConversation(
    userId: string,
    excludedConversationId?: string,
  ): Promise<ConversationEntity | null> {
    const where: Record<string, unknown> = {
      userId,
      status: ConversationStatus.INACTIVE,
    };

    if (excludedConversationId) {
      where.conversationId = Not(excludedConversationId);
    }

    const conversation = await this.conversationRepository.findOne({
      where,
      order: { lastUpdate: 'DESC' },
    });

    return conversation || null;
  }

  async renameConversationTitle(
    conversationId: string,
    userId: string,
    request: RenameConversationTitleRequest,
  ): Promise<Conversation> {
    const conversation = await this.getConversationEntityByIdForUser(conversationId, userId);

    conversation.title = request.title.trim();

    const savedConversation = await this.conversationRepository.save(conversation);
    return Conversation.fromEntityToModel(savedConversation);
  }

  async setConversationStatus(
    conversationId: string,
    userId: string,
    status: ConversationStatus,
  ): Promise<Conversation> {
    const conversation = await this.getConversationEntityByIdForUser(conversationId, userId);
    conversation.status = status;

    const savedConversation = await this.conversationRepository.save(conversation);
    return Conversation.fromEntityToModel(savedConversation);
  }

  async deactivateActiveConversation(userId: string, exceptConversationId?: string): Promise<void> {
    await this.conversationRepository
      .createQueryBuilder()
      .update(ConversationEntity)
      .set({ status: ConversationStatus.INACTIVE })
      .where('userId = :userId', { userId })
      .andWhere('status = :status', { status: ConversationStatus.ACTIVE })
      .andWhere(exceptConversationId ? 'conversationId != :exceptConversationId' : '1=1', {
        exceptConversationId,
      })
      .execute();
  }

  async touchConversationLastUpdate(conversationId: string, userId: string): Promise<void> {
    const conversation = await this.getConversationEntityByIdForUser(conversationId, userId);
    conversation.lastUpdate = new Date();
    await this.conversationRepository.save(conversation);
  }

  private getDefaultTitle(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    const hours = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');

    return `CHAT - ${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
