import { Injectable } from '@angular/core';
import { Observable, delay, of, switchMap, throwError, timer } from 'rxjs';

export interface AsyncDemoMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface SendMessageResponse {
  userMessage: AsyncDemoMessage;
  assistantMessage: AsyncDemoMessage;
}

@Injectable({
  providedIn: 'root',
})
export class AsyncDemoService {
  private static readonly ASYNC_DELAY_SIMULATION = 1200;
  private messageCounter = 2;

  private messages: AsyncDemoMessage[] = [
    {
      id: 'msg-1',
      role: 'assistant',
      content: 'Welcome! This is an async chat demo.',
    },
    {
      id: 'msg-2',
      role: 'assistant',
      content: 'Write a message and I will reply with a mock echo.',
    },
  ];

  loadMessages(shouldFail: boolean): Observable<AsyncDemoMessage[]> {
    if (shouldFail) {
      return this.buildDelayedError('Mock async error: failed to load messages.');
    }

    return of(this.messages).pipe(delay(AsyncDemoService.ASYNC_DELAY_SIMULATION));
  }

  sendMessage(content: string, shouldFail: boolean): Observable<SendMessageResponse> {
    const normalizedContent = content.trim();

    if (!normalizedContent) {
      return throwError(() => new Error('Message cannot be empty.'));
    }

    if (shouldFail) {
      return this.buildDelayedError('Mock async error: failed to send message.');
    }

    const userMessage: AsyncDemoMessage = {
      id: this.nextMessageId(),
      role: 'user',
      content: normalizedContent,
    };

    const assistantMessage: AsyncDemoMessage = {
      id: this.nextMessageId(),
      role: 'assistant',
      content: `Echo mock: ${normalizedContent}`,
    };

    return of({
      userMessage,
      assistantMessage,
    }).pipe(delay(AsyncDemoService.ASYNC_DELAY_SIMULATION));
  }

  private nextMessageId(): string {
    this.messageCounter += 1;
    return `msg-${this.messageCounter}`;
  }

  private buildDelayedError(message: string): Observable<never> {
    return timer(AsyncDemoService.ASYNC_DELAY_SIMULATION).pipe(
      switchMap(() => throwError(() => new Error(message))),
    );
  }
}
