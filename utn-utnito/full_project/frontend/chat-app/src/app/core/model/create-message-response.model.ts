import { Message } from './message.model';

export interface CreateMessageResponse {
  conversationId: string;
  userMessage: Message;
  assistantMessage: Message;
}
