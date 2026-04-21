import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Conversation } from '../model/conversation.interface';
import { Message } from '../model/message.interface';
import { MessageRole } from '../model/message-role.enum';
import { ChatApiService } from './chat-api.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private selectedConversationId: string | null = null;
  private conversationFilter = '';
  private draftMessage = '';

  private conversations: Conversation[] = [];

  constructor(private readonly chatApiService: ChatApiService) {}

  getConversationFilter(): string {
    return this.conversationFilter;
  }

  setConversationFilter(value: string): void {
    this.conversationFilter = value;

    if (!this.selectedConversationId) {
      return;
    }

    const filteredConversations = this.getFilteredConversations();
    const selectedConversationVisible = filteredConversations.some(
      (conversation) => conversation.id === this.selectedConversationId,
    );

    if (!selectedConversationVisible) {
      this.selectedConversationId = filteredConversations[0]?.id || null;
    }
  }

  getDraftMessage(): string {
    return this.draftMessage;
  }

  setDraftMessage(value: string): void {
    this.draftMessage = value;
  }

  getSelectedConversationId(): string | null {
    return this.selectedConversationId;
  }

  getConversations(): Conversation[] {
    return this.conversations;
  }

  getVisibleConversations(): Conversation[] {
    return this.getConversations().filter((conversation) => !conversation.archived);
  }

  getFilteredConversations(): Conversation[] {
    const normalizedFilter = this.conversationFilter.trim().toLowerCase();

    if (!normalizedFilter) {
      return this.getVisibleConversations();
    }

    return this.getVisibleConversations().filter((conversation) =>
      conversation.title.toLowerCase().includes(normalizedFilter),
    );
  }

  getActiveConversation(): Conversation | null {
    if (!this.selectedConversationId) {
      return null;
    }

    return (
      this.getConversations().find(
        (conversation) => conversation.id === this.selectedConversationId && !conversation.archived,
      ) || null
    );
  }

  getActiveConversationTitle(): string {
    return this.getActiveConversation()?.title || 'No conversation selected';
  }

  getVisibleMessages(): Message[] {
    return this.getActiveConversation()?.messages || [];
  }

  loadConversations(): Observable<Conversation[]> {
    return this.chatApiService.listConversations().pipe(
      // Keep only the conversation array from the paginated response object.
      map((pagination) => pagination.data),
      tap((conversations) => {
        this.conversations = conversations;
        this.ensureSelectedConversation();
      }),
    );
  }

  selectConversation(conversationId: string): void {
    this.selectedConversationId = conversationId;
  }

  createNewConversation(): void {
    const nextConversationIndex = this.getConversations().length + 1;
    const newConversation: Conversation = {
      id: `conv-local-${Date.now()}`,
      title: `New conversation ${nextConversationIndex}`,
      archived: false,
      messages: [
        {
          id: `m-local-${Date.now()}`,
          role: MessageRole.ASSISTANT,
          content: 'New local conversation created. Send your first message.',
        },
      ],
    };

    this.conversations.unshift(newConversation);
    this.selectedConversationId = newConversation.id;
    this.conversationFilter = '';
    this.draftMessage = '';
  }

  archiveConversation(conversationId: string): void {
    const conversation = this.conversations.find((item) => item.id === conversationId && !item.archived);

    if (!conversation) {
      return;
    }

    conversation.archived = true;

    if (this.selectedConversationId === conversationId) {
      this.selectedConversationId = this.getFilteredConversations()[0]?.id || null;
    }
  }

  sendDraftMessage(): boolean {
    const activeConversation = this.getActiveConversation();
    const normalizedDraft = this.draftMessage.trim();

    if (!activeConversation || !normalizedDraft) {
      return false;
    }

    activeConversation.messages.push({
      id: `m-user-${Date.now()}`,
      role: MessageRole.USER,
      content: normalizedDraft,
    });

    activeConversation.messages.push({
      id: `m-assistant-${Date.now() + 1}`,
      role: MessageRole.ASSISTANT,
      content: `Local reply: I received "${normalizedDraft}".`,
    });

    this.draftMessage = '';
    return true;
  }

  ensureSelectedConversation(): void {
    if (this.selectedConversationId) {
      return;
    }

    this.selectedConversationId = this.getVisibleConversations()[0]?.id || null;
  }
}
