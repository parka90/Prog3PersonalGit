import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  AsyncDemoMessage,
  AsyncDemoService,
  SendMessageResponse,
} from './service/async-demo.service';
import { AsyncDemoStatus } from './model/async-demo-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  readonly title = 'Class 10 - Async concept demo';
  readonly subtitle = 'Send message + mock echo using Observable flow';

  messages: AsyncDemoMessage[] = [];
  loadingMessages = false;
  sendingMessage = false;

  draftMessage = '';
  errorMessage = '';
  lastStatus: AsyncDemoStatus = AsyncDemoStatus.INIT;
  requestCount = 0;

  constructor(private readonly asyncDemoService: AsyncDemoService) {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loadingMessages = true;
    this.errorMessage = '';
    this.requestCount += 1;

    this.asyncDemoService
      .loadMessages(false)
      // pipe adds extra behavior to the async flow before we handle the result.
      .pipe(
        finalize(() => {
          this.loadingMessages = false;
        }),
      )
      // subscribe starts the Observable and listens for success or failure.
      .subscribe({
        // next runs when the request succeeds.
        next: (messages) => {
          this.messages = messages;
          this.lastStatus = AsyncDemoStatus.MESSAGES_LOADED;
        },
        // error runs only if the request fails (next will not run in that case).
        error: (error: unknown) => {
          this.lastStatus = AsyncDemoStatus.MESSAGES_ERROR;
          this.errorMessage = error instanceof Error ? error.message : 'Unknown async error';
        },
      });
  }

  loadMessagesWithError(): void {
    this.loadingMessages = true;
    this.errorMessage = '';
    this.requestCount += 1;

    this.asyncDemoService
      .loadMessages(true)
      // pipe adds extra behavior to the async flow before we handle the result.
      .pipe(
        finalize(() => {
          this.loadingMessages = false;
        }),
      )
      // subscribe starts the Observable and listens for success or failure.
      .subscribe({
        // next runs when the request succeeds.
        next: (messages) => {
          this.messages = messages;
          this.lastStatus = AsyncDemoStatus.MESSAGES_LOADED;
        },
        // error runs only if the request fails (next will not run in that case).
        error: (error: unknown) => {
          this.lastStatus = AsyncDemoStatus.MESSAGES_ERROR;
          this.errorMessage = error instanceof Error ? error.message : 'Unknown async error';
        },
      });
  }

  onDraftInput(value: string): void {
    this.draftMessage = value;
  }

  sendMessage(event: Event, shouldFail = false): void {
    event.preventDefault();

    const content = this.draftMessage.trim();

    if (!content || this.sendingMessage) {
      return;
    }

    this.sendingMessage = true;
    this.errorMessage = '';
    this.requestCount += 1;

    this.asyncDemoService
      .sendMessage(content, shouldFail)
      // pipe adds extra behavior to the async flow before we handle the result.
      .pipe(
        finalize(() => {
          this.sendingMessage = false;
        }),
      )
      // subscribe starts the Observable and listens for success or failure.
      .subscribe({
        // next runs when the request succeeds.
        next: (response: SendMessageResponse) => {
          this.messages.push(response.userMessage);
          this.messages.push(response.assistantMessage);
          this.draftMessage = '';
          this.lastStatus = AsyncDemoStatus.MESSAGE_SENT;
        },
        // error runs only if the request fails (next will not run in that case).
        error: (error: unknown) => {
          this.lastStatus = AsyncDemoStatus.SEND_ERROR;
          this.errorMessage = error instanceof Error ? error.message : 'Unknown async error';
        },
      });
  }

  clearMessages(): void {
    this.messages = [];
  }
}
