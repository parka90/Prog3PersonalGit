import { AbstractBasicChatObject } from 'src/basic/abstract-basic-chat-object';
import { MessageRole } from './message-role.enum';

export class Message extends AbstractBasicChatObject {
  messageId: string;
  conversationId: string;
  userId: string;
  role: MessageRole;
  content: string;

  static fromEntityToModel(entity: Partial<Message>): Message {
    const model = new Message();
    Object.assign(model, entity);
    return model;
  }
}
