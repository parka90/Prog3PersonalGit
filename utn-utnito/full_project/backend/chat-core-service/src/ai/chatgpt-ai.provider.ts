import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';
import { buildChatGptMessagePrompt } from './prompt/chatgpt-message.prompt';

interface N8nAiResponse {
  action?: string;
  error?: boolean;
  data?: {
    assistantMessage?: string;
    errorMessage?: string;
    errorDetails?: string;
    [key: string]: unknown;
  };
  origin?: string;
}

@Injectable()
export class ChatGptAiProvider implements AiProvider {
  private readonly logger = new Logger(ChatGptAiProvider.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const webhookUrl = this.configService.get<string>('AI_N8N_WEBHOOK_URL', '');
    const timeout = Number(this.configService.get<string>('AI_N8N_TIMEOUT_MS', '15000'));

    if (!webhookUrl.trim()) {
      throw new Error('AI_N8N_WEBHOOK_URL is not configured');
    }

    const prompt = buildChatGptMessagePrompt(this.configService, request);
    const payload = {
      prompt,
      userMessage: request.latestUserMessage,
      context: {
        userId: request.userId,
        conversationId: request.conversationId,
        conversationTitle: request.conversationTitle,
      },
    };

    const response = await firstValueFrom(
      this.httpService.post<N8nAiResponse>(webhookUrl, payload, {
        timeout: Number.isFinite(timeout) && timeout > 0 ? timeout : 15000,
      }),
    );

    const parsedResponse = response.data || {};

    if (parsedResponse.error) {
      const errorMessage = parsedResponse.data?.errorMessage || 'Unknown n8n processing error';
      const errorDetails = parsedResponse.data?.errorDetails
        ? ` | details: ${parsedResponse.data.errorDetails}`
        : '';
      throw new Error(`n8n AI workflow error: ${errorMessage}${errorDetails}`);
    }

    const assistantMessage = parsedResponse.data?.assistantMessage;
    if (!assistantMessage || typeof assistantMessage !== 'string') {
      this.logger.error(`Invalid n8n response payload: ${JSON.stringify(parsedResponse)}`);
      throw new Error('Invalid n8n AI response: missing assistantMessage');
    }

    return assistantMessage.trim();
  }
}
