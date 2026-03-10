import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AiService } from 'src/ai/ai.service';
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

    const assistantContent = await this.aiService.generateReply(request.content.trim(), conversation.title);

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
}
