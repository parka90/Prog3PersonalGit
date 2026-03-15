import { Injectable } from '@nestjs/common';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';

@Injectable()
export class MockAiProvider implements AiProvider {
  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const normalizedMessage = request.latestUserMessage.trim();

    if (!normalizedMessage) {
      return 'Please type a message so I can help you with the course project.';
    }

    return `Mock reply from UTNito for "${request.conversationTitle}": ${normalizedMessage}`;
  }
}
