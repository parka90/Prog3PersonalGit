import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AbstractBasicChatEntity } from 'src/basic/abstract-basic-chat-entity';
import { ConversationStatus } from '../model/conversation-status.enum';

@Entity({ name: 'conversations' })
export class ConversationEntity extends AbstractBasicChatEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  conversationId: string;

  @Column({ type: 'varchar', length: 64 })
  userId: string;

  @Column({ type: 'varchar', length: 80 })
  title: string;

  @Column({ type: 'varchar', length: 16, default: ConversationStatus.INACTIVE })
  status: ConversationStatus;
}
