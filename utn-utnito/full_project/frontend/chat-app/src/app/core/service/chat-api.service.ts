import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { Conversation } from '../model/conversation.model';
import { Pagination } from '../model/pagination.model';
import { Message } from '../model/message.model';
import { CreateMessageResponse } from '../model/create-message-response.model';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  listConversations(params?: {
    search?: string;
    page?: number;
    limit?: number;
    includeArchived?: boolean;
  }): Observable<Pagination<Conversation>> {
    return this.get<Pagination<Conversation>>('chat-app/conversations', params).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to load conversations');
        }

        return response.data;
      }),
    );
  }

  createConversation(title?: string): Observable<Conversation> {
    return this.post<Conversation>('chat-app/conversations', {
      title: title?.trim() || undefined,
    }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to create conversation');
        }

        return response.data;
      }),
    );
  }

  activateConversation(conversationId: string): Observable<Conversation> {
    return this.patch<Conversation>(`chat-app/conversations/${conversationId}/activate`, {}).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to activate conversation');
        }

        return response.data;
      }),
    );
  }

  renameConversationTitle(conversationId: string, title: string): Observable<Conversation> {
    return this.patch<Conversation>(`chat-app/conversations/${conversationId}/title`, {
      title,
    }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to rename conversation');
        }

        return response.data;
      }),
    );
  }

  archiveConversation(conversationId: string): Observable<Conversation> {
    return this.patch<Conversation>(`chat-app/conversations/${conversationId}/archive`, {}).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to archive conversation');
        }

        return response.data;
      }),
    );
  }

  listMessages(conversationId: string, page = 1, limit = 50): Observable<Pagination<Message>> {
    return this.get<Pagination<Message>>(`chat-app/conversations/${conversationId}/messages`, {
      page,
      limit,
    }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to load messages');
        }

        return response.data;
      }),
    );
  }

  createMessage(conversationId: string, content: string): Observable<CreateMessageResponse> {
    return this.post<CreateMessageResponse>(`chat-app/conversations/${conversationId}/messages`, {
      content,
    }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to send message');
        }

        return response.data;
      }),
    );
  }
}
