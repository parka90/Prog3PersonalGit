import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/model/jwt-payload.model';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { AbstractController } from 'src/basic/abstract.controller';
import { ResponseObject } from 'src/basic/response-object';
import { Conversation } from 'src/conversation/model/conversation.model';
import { CreateConversationRequest } from 'src/conversation/request/create-conversation.request';
import { ListConversationsRequest } from 'src/conversation/request/list-conversations.request';
import { RenameConversationTitleRequest } from 'src/conversation/request/rename-conversation-title.request';
import { CreateMessageRequest } from 'src/message/request/create-message.request';
import { ListMessagesRequest } from 'src/message/request/list-messages.request';
import { CreateMessageResponse } from 'src/message/model/create-message-response.model';
import { Message } from 'src/message/model/message.model';
import { Pagination } from 'src/shared/pagination.model';
import { ChatAppService } from './chat-app.service';

@ApiTags('chat-app')
@ApiBearerAuth('jwtAuth')
@UseGuards(JwtAuthGuard)
@Controller('chat-app')
export class ChatAppController extends AbstractController {
  constructor(private readonly chatAppService: ChatAppService) {
    super();
  }

  @Get('conversations')
  @ApiOperation({ summary: 'List user conversations with optional filters' })
  async listConversations(
    @Req() request: Request & { user: JwtPayload },
    @Query() query: ListConversationsRequest,
  ): Promise<ResponseObject<Pagination<Conversation>>> {
    const conversations = await this.chatAppService.listConversations(request.user.sub, query);
    return this.createOkResponse(conversations);
  }

  @Post('conversations')
  @ApiOperation({ summary: 'Create a conversation and make it ACTIVE for the user' })
  async createConversation(
    @Req() request: Request & { user: JwtPayload },
    @Body() createRequest: CreateConversationRequest,
  ): Promise<ResponseObject<Conversation>> {
    const conversation = await this.chatAppService.createConversationAndActivate(
      request.user.sub,
      createRequest,
    );

    return this.createOkResponse(conversation);
  }

  @Get('conversations/:conversationId')
  @ApiOperation({ summary: 'Get one user conversation by id' })
  async getConversationById(
    @Req() request: Request & { user: JwtPayload },
    @Param('conversationId') conversationId: string,
  ): Promise<ResponseObject<Conversation>> {
    const conversation = await this.chatAppService.getConversation(request.user.sub, conversationId);

    return this.createOkResponse(conversation);
  }

  @Patch('conversations/:conversationId/title')
  @ApiOperation({ summary: 'Rename one user conversation title' })
  async renameConversationTitle(
    @Req() request: Request & { user: JwtPayload },
    @Param('conversationId') conversationId: string,
    @Body() renameRequest: RenameConversationTitleRequest,
  ): Promise<ResponseObject<Conversation>> {
    const conversation = await this.chatAppService.renameConversationTitle(
      request.user.sub,
      conversationId,
      renameRequest,
    );

    return this.createOkResponse(conversation);
  }

  @Patch('conversations/:conversationId/activate')
  @ApiOperation({ summary: 'Set one user conversation as ACTIVE and move previous ACTIVE to INACTIVE' })
  async activateConversation(
    @Req() request: Request & { user: JwtPayload },
    @Param('conversationId') conversationId: string,
  ): Promise<ResponseObject<Conversation>> {
    const conversation = await this.chatAppService.activateConversation(request.user.sub, conversationId);
    return this.createOkResponse(conversation);
  }

  @Patch('conversations/:conversationId/archive')
  @ApiOperation({ summary: 'Archive one user conversation and hide it from default list' })
  async archiveConversation(
    @Req() request: Request & { user: JwtPayload },
    @Param('conversationId') conversationId: string,
  ): Promise<ResponseObject<Conversation>> {
    const conversation = await this.chatAppService.archiveConversation(request.user.sub, conversationId);
    return this.createOkResponse(conversation);
  }

  @Get('conversations/:conversationId/messages')
  @ApiOperation({ summary: 'List messages for one user conversation' })
  async listMessages(
    @Req() request: Request & { user: JwtPayload },
    @Param('conversationId') conversationId: string,
    @Query() query: ListMessagesRequest,
  ): Promise<ResponseObject<Pagination<Message>>> {
    const messages = await this.chatAppService.listMessages(request.user.sub, conversationId, query);
    return this.createOkResponse(messages);
  }

  @Post('conversations/:conversationId/messages')
  @ApiOperation({ summary: 'Create user message and generate assistant mock reply' })
  async createMessage(
    @Req() request: Request & { user: JwtPayload },
    @Param('conversationId') conversationId: string,
    @Body() createRequest: CreateMessageRequest,
  ): Promise<ResponseObject<CreateMessageResponse>> {
    const response = await this.chatAppService.createMessage(
      request.user.sub,
      conversationId,
      createRequest,
    );
    return this.createOkResponse(response);
  }
}
