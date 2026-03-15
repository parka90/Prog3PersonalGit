import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AiService } from 'src/ai/ai.service';
import { AiContextMessage } from 'src/ai/ai-provider.interface';
import { ConversationService } from 'src/conversation/conversation.service';
import { ConversationStatus } from 'src/conversation/model/conversation-status.enum';
import { Pagination } from 'src/shared/pagination.model';
import { MessageEntity } from './entity/message.entity';
import { CreateMessageResponse } from './model/create-message-response.model';
import { Message } from './model/message.model';
import { MessageRole } from './model/message-role.enum';
import { CreateMessageRequest } from './request/create-message.request';
import { ListMessagesRequest } from './request/list-messages.request';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly conversationService: ConversationService,
    private readonly aiService: AiService,
    private readonly configService: ConfigService,
  ) {}

  async listMessages(
    userId: string,
    conversationId: string,
    request: ListMessagesRequest,
  ): Promise<Pagination<Message>> {
    const { page = 1, limit = 50 } = request;
    const skip = (page - 1) * limit;

    await this.conversationService.getConversationByIdForUser(conversationId, userId);

    const [messages, total] = await this.messageRepository.findAndCount({
      where: { conversationId, userId },
      order: { creationDate: 'ASC' },
      skip,
      take: limit,
    });

    return new Pagination(
      messages.map((messageEntity) => Message.fromEntityToModel(messageEntity)),
      total,
      page,
      limit,
    );
  }

  async createMessage(
    userId: string,
    conversationId: string,
    request: CreateMessageRequest,
  ): Promise<CreateMessageResponse> {
    const conversation = await this.conversationService.getConversationByIdForUser(conversationId, userId);

    if (conversation.status === ConversationStatus.ARCHIVED) {
      throw new BadRequestException('Archived conversations do not allow new messages');
    }

    const userMessageEntity = this.messageRepository.create({
      messageId: `msg_${uuidv4()}`,
      conversationId,
      userId,
      role: MessageRole.USER,
      content: request.content.trim(),
    });

    const savedUserMessage = await this.messageRepository.save(userMessageEntity);

    const maxContextPairs = Number(this.configService.get<string>('AI_CONTEXT_MAX_PAIRS', '5'));
    const recentMessages = await this.getRecentMessagesForContext(
      userId,
      conversationId,
      maxContextPairs,
    );

    const assistantContent = await this.aiService.generateReply({
      userId,
      conversationId,
      conversationTitle: conversation.title,
      latestUserMessage: request.content.trim(),
      recentMessages,
    });

    const assistantMessageEntity = this.messageRepository.create({
      messageId: `msg_${uuidv4()}`,
      conversationId,
      userId,
      role: MessageRole.ASSISTANT,
      content: assistantContent,
    });

    const savedAssistantMessage = await this.messageRepository.save(assistantMessageEntity);

    await this.conversationService.touchConversationLastUpdate(conversationId, userId);

    return {
      conversationId,
      userMessage: Message.fromEntityToModel(savedUserMessage),
      assistantMessage: Message.fromEntityToModel(savedAssistantMessage),
    };
  }

  private async getRecentMessagesForContext(
    userId: string,
    conversationId: string,
    maxPairs: number,
  ): Promise<AiContextMessage[]> {
    const numericPairs = Number(maxPairs);
    const safePairs =
      Number.isFinite(numericPairs) && numericPairs > 0 ? Math.floor(numericPairs) : 5;
    const maxMessages = safePairs * 2;

    const messages = await this.messageRepository.find({
      where: { userId, conversationId },
      order: { creationDate: 'DESC' },
      take: maxMessages,
    });

    return messages.reverse().map((messageEntity) => ({
      role: messageEntity.role,
      content: messageEntity.content,
      creationDate: messageEntity.creationDate,
    }));
  }
}
