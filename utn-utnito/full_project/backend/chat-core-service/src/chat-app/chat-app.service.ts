import { BadRequestException, Injectable } from '@nestjs/common';
import { Conversation } from 'src/conversation/model/conversation.model';
import { ConversationStatus } from 'src/conversation/model/conversation-status.enum';
import { ConversationService } from 'src/conversation/conversation.service';
import { CreateConversationRequest } from 'src/conversation/request/create-conversation.request';
import { ListConversationsRequest } from 'src/conversation/request/list-conversations.request';
import { RenameConversationTitleRequest } from 'src/conversation/request/rename-conversation-title.request';
import { CreateMessageResponse } from 'src/message/model/create-message-response.model';
import { Message } from 'src/message/model/message.model';
import { CreateMessageRequest } from 'src/message/request/create-message.request';
import { ListMessagesRequest } from 'src/message/request/list-messages.request';
import { MessageService } from 'src/message/message.service';
import { Pagination } from 'src/shared/pagination.model';

@Injectable()
export class ChatAppService {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  async listConversations(userId: string, request: ListConversationsRequest): Promise<Pagination<Conversation>> {
    return this.conversationService.listConversations(userId, request);
  }

  async createConversationAndActivate(
    userId: string,
    request: CreateConversationRequest,
  ): Promise<Conversation> {
    await this.conversationService.deactivateActiveConversation(userId);

    return this.conversationService.createConversation(userId, request, ConversationStatus.ACTIVE);
  }

  async getConversation(userId: string, conversationId: string): Promise<Conversation> {
    return this.conversationService.getConversationByIdForUser(conversationId, userId);
  }

  async renameConversationTitle(
    userId: string,
    conversationId: string,
    request: RenameConversationTitleRequest,
  ): Promise<Conversation> {
    return this.conversationService.renameConversationTitle(conversationId, userId, request);
  }

  async activateConversation(userId: string, conversationId: string): Promise<Conversation> {
    const targetConversation = await this.conversationService.getConversationEntityByIdForUser(
      conversationId,
      userId,
    );

    if (targetConversation.status === ConversationStatus.ARCHIVED) {
      throw new BadRequestException('Archived conversations cannot be activated');
    }

    await this.conversationService.deactivateActiveConversation(userId, conversationId);

    return this.conversationService.setConversationStatus(
      conversationId,
      userId,
      ConversationStatus.ACTIVE,
    );
  }

  async archiveConversation(userId: string, conversationId: string): Promise<Conversation> {
    const targetConversation = await this.conversationService.getConversationEntityByIdForUser(
      conversationId,
      userId,
    );

    const wasActive = targetConversation.status === ConversationStatus.ACTIVE;

    const archivedConversation = await this.conversationService.setConversationStatus(
      conversationId,
      userId,
      ConversationStatus.ARCHIVED,
    );

    if (wasActive) {
      const fallbackConversation = await this.conversationService.findMostRecentInactiveConversation(
        userId,
        conversationId,
      );

      if (fallbackConversation) {
        await this.conversationService.setConversationStatus(
          fallbackConversation.conversationId,
          userId,
          ConversationStatus.ACTIVE,
        );
      }
    }

    return archivedConversation;
  }

  async listMessages(
    userId: string,
    conversationId: string,
    request: ListMessagesRequest,
  ): Promise<Pagination<Message>> {
    return this.messageService.listMessages(userId, conversationId, request);
  }

  async createMessage(
    userId: string,
    conversationId: string,
    request: CreateMessageRequest,
  ): Promise<CreateMessageResponse> {
    await this.activateConversation(userId, conversationId);
    return this.messageService.createMessage(userId, conversationId, request);
  }
}
