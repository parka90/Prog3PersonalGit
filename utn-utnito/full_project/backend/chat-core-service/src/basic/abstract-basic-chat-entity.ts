import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractBasicChatEntity {
  @CreateDateColumn({
    type: process.env.DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
    update: false,
  })
  creationDate: Date;

  @UpdateDateColumn({
    type: process.env.DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
  })
  lastUpdate: Date;
}
