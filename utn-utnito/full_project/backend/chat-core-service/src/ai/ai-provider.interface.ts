export interface AiContextMessage {
  role: string;
  content: string;
  creationDate?: Date;
}

export interface GenerateReplyRequest {
  userId: string;
  conversationId: string;
  conversationTitle: string;
  latestUserMessage: string;
  recentMessages: AiContextMessage[];
}

export interface AiProvider {
  generateReply(request: GenerateReplyRequest): Promise<string>;
}
