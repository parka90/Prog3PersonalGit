import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider } from './ai-provider.interface';
import { MockAiProvider } from './mock-ai.provider';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mockAiProvider: MockAiProvider,
  ) {}

  async generateReply(userMessage: string, conversationTitle: string): Promise<string> {
    const provider = this.configService.get<string>('AI_PROVIDER', 'mock').toLowerCase();

    if (provider !== 'mock') {
      this.logger.warn(`Unsupported AI_PROVIDER "${provider}". Falling back to mock provider.`);
    }

    return this.getProvider(provider).generateReply(userMessage, conversationTitle);
  }

  private getProvider(provider: string): AiProvider {
    switch (provider) {
      case 'mock':
      default:
        return this.mockAiProvider;
    }
  }
}
