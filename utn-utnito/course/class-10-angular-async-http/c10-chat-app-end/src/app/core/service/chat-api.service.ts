import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Conversation } from '../model/conversation.interface';
import { Message } from '../model/message.interface';
import { Pagination } from '../model/pagination.interface';
import { ResponseObject } from '../model/response-object.interface';
import { CreateMessageResponse } from '../model/create-message-response.interface';
import { MessageRole } from '../model/message-role.enum';

interface ReplyTemplate {
  assistantPrefix: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private readonly mockApiBaseUrl = environment.mockApiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  listConversations(): Observable<Pagination<Conversation>> {
    return this.http
      .get<ResponseObject<Pagination<Conversation>>>(`${this.mockApiBaseUrl}/conversations.json`)
      // Unwraps { success, data } and keeps the async demo latency visible in UI.
      .pipe(map((response) => this.unwrapResponse(response, 'Failed to load conversations')), delay(500));
  }

  listMessages(conversationId: string): Observable<Pagination<Message>> {
    return this.http
      .get<ResponseObject<Pagination<Message>>>(`${this.mockApiBaseUrl}/messages-${conversationId}.json`)
      // Same unwrap flow for messages, with a shorter delay.
      .pipe(map((response) => this.unwrapResponse(response, 'Failed to load messages')), delay(450));
  }

  createMessage(conversationId: string, content: string): Observable<CreateMessageResponse> {
    return this.http
      .get<ResponseObject<ReplyTemplate>>(`${this.mockApiBaseUrl}/reply-template.json`)
      .pipe(
        map((response) => {
          const template = this.unwrapResponse(response, 'Failed to load assistant reply template');
          const normalizedContent = content.trim();
          const seed = Date.now();

          return {
            conversationId,
            userMessage: {
              id: `m-user-${seed}`,
              role: MessageRole.USER,
              content: normalizedContent,
            },
            assistantMessage: {
              id: `m-assistant-${seed + 1}`,
              role: MessageRole.ASSISTANT,
              content: `${template.assistantPrefix} "${normalizedContent}"`,
            },
          };
        }),
        delay(700),
      );
  }

  private unwrapResponse<T>(response: ResponseObject<T>, fallbackMessage: string): T {
    if (!response.success) {
      throw new Error(response.responseMessage?.message || fallbackMessage);
    }

    return response.data;
  }
}
