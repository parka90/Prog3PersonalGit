import { AbstractBasicChatObject } from 'src/basic/abstract-basic-chat-object';
import { ConversationStatus } from './conversation-status.enum';

export class Conversation extends AbstractBasicChatObject {
  conversationId: string;
  userId: string;
  title: string;
  status: ConversationStatus;

  static fromEntityToModel(entity: Partial<Conversation>): Conversation {
    const model = new Conversation();
    Object.assign(model, entity);
    return model;
  }
}
