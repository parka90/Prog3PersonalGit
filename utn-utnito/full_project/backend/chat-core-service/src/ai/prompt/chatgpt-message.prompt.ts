import { ConfigService } from '@nestjs/config';
import { GenerateReplyRequest } from '../ai-provider.interface';

export function buildChatGptMessagePrompt(
  configService: ConfigService,
  request: GenerateReplyRequest,
): string {
  const assistantName = configService.get<string>('AI_ASSISTANT_NAME', 'UTNito');
  const assistantDescription = configService.get<string>(
    'AI_ASSISTANT_DESCRIPTION',
    'an AI assistant for a university programming course',
  );
  const assistantPersonality = configService.get<string>(
    'AI_ASSISTANT_PERSONALITY',
    'friendly, clear, and practical programming mentor',
  );

  const formattedRecentMessages = request.recentMessages
    .map((message) => {
      const roleLabel = message.role.toUpperCase() === 'ASSISTANT' ? 'Assistant' : 'User';
      return `- ${roleLabel}: ${message.content}`;
    })
    .join('\n');

  const rawRecentMessages = JSON.stringify(request.recentMessages, null, 2);

  return `
You are ${assistantName}, ${assistantDescription}.

Personality:
- ${assistantPersonality}

Important behavior rules:
- Keep responses concise and practical.
- Help the student move forward step by step.
- If context is unclear, ask one short clarifying question.
- Never invent technical facts.
- Respond in the same language used by the latest user message.

Conversation title:
"${request.conversationTitle}"

Recent conversation context:
${formattedRecentMessages || '- (no recent messages)'}

Latest user message:
"${request.latestUserMessage}"

Raw recent messages (JSON):
\`\`\`json
${rawRecentMessages}
\`\`\`
`.trim();
}
