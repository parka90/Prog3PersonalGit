import { Injectable } from '@nestjs/common';
import { AiProvider } from './ai-provider.interface';

@Injectable()
export class MockAiProvider implements AiProvider {
  async generateReply(userMessage: string, conversationTitle: string): Promise<string> {
    const normalizedMessage = userMessage.trim();

    if (!normalizedMessage) {
      return 'Please type a message so I can help you with the course project.';
    }

    return `Mock reply from UTNito for "${conversationTitle}": ${normalizedMessage}`;
  }
}
