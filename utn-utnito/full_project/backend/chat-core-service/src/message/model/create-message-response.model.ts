import { Message } from './message.model';

export class CreateMessageResponse {
  conversationId: string;
  userMessage: Message;
  assistantMessage: Message;
}
