import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { AbstractBasicChatEntity } from 'src/basic/abstract-basic-chat-entity';
import { MessageRole } from '../model/message-role.enum';

@Entity({ name: 'messages' })
@Index('idx_messages_conversation_creation', ['conversationId', 'creationDate'])
export class MessageEntity extends AbstractBasicChatEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  messageId: string;

  @Column({ type: 'varchar', length: 64 })
  conversationId: string;

  @Column({ type: 'varchar', length: 64 })
  userId: string;

  @Column({ type: 'varchar', length: 16 })
  role: MessageRole;

  @Column({ type: 'text' })
  content: string;
}
