export interface AiProvider {
  generateReply(userMessage: string, conversationTitle: string): Promise<string>;
}
