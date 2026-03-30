const SIDEBAR_MIN_WIDTH = 200;
const SIDEBAR_MAX_WIDTH = 420;

const chatLayout = document.querySelector('#chat-layout');
const chatList = document.querySelector('#chat-list');
const newChatButton = document.querySelector('#new-chat-btn');
const messagesContainer = document.querySelector('#messages');
const activeChatTitle = document.querySelector('#active-chat-title');
const userDisplayNameNode = document.querySelector('#user-display-name');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#composer-input');
const sendButton = document.querySelector('#send-btn');
const sidebarResizer = document.querySelector('#sidebar-resizer');

const state = {
  conversations: [],
  activeConversationId: null,
  conversationCounter: 0,
};

const createConversation = (title, firstAssistantMessage) => {
  state.conversationCounter += 1;

  return {
    id: `conv_${state.conversationCounter}`,
    title,
    messages: firstAssistantMessage
      ? [
          {
            role: 'assistant',
            content: firstAssistantMessage,
          },
        ]
      : [],
  };
};

const getActiveConversation = () => {
  return state.conversations.find((conversation) => conversation.id === state.activeConversationId) || null;
};

const createMessageElement = (role, content) => {
  const article = document.createElement('article');
  article.className = `message ${role}`;

  const paragraph = document.createElement('p');
  paragraph.textContent = content;

  article.appendChild(paragraph);
  return article;
};

const renderConversations = () => {
  if (!chatList) {
    return;
  }

  chatList.innerHTML = '';

  state.conversations.forEach((conversation) => {
    const item = document.createElement('li');
    item.className = `chat-item ${conversation.id === state.activeConversationId ? 'active' : ''}`;

    const row = document.createElement('div');
    row.className = 'chat-item-row';

    const selectButton = document.createElement('button');
    selectButton.type = 'button';
    selectButton.className = 'chat-item-btn';
    selectButton.dataset.conversationId = conversation.id;
    selectButton.textContent = conversation.title;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'chat-delete-btn';
    deleteButton.dataset.conversationId = conversation.id;
    deleteButton.setAttribute('aria-label', `Delete ${conversation.title}`);
    deleteButton.textContent = '×';

    row.appendChild(selectButton);
    row.appendChild(deleteButton);
    item.appendChild(row);
    chatList.appendChild(item);
  });
};

const renderMessages = () => {
  if (!messagesContainer) {
    return;
  }

  const conversation = getActiveConversation();
  messagesContainer.innerHTML = '';

  if (!conversation) {
    messagesContainer.appendChild(createMessageElement('system', 'No active conversation selected.'));
    return;
  }

  if (activeChatTitle) {
    activeChatTitle.textContent = conversation.title;
  }

  conversation.messages.forEach((message) => {
    messagesContainer.appendChild(createMessageElement(message.role, message.content));
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

const selectConversation = (conversationId) => {
  const exists = state.conversations.some((conversation) => conversation.id === conversationId);
  if (!exists) {
    return;
  }

  state.activeConversationId = conversationId;
  renderConversations();
  renderMessages();
};

const addConversation = () => {
  const newTitle = `Chat ${state.conversationCounter + 1}`;
  const conversation = createConversation(
    newTitle,
    `Hi! This is ${newTitle}. Send a message and I will reply with a mock response.`,
  );

  state.conversations.unshift(conversation);
  state.activeConversationId = conversation.id;

  renderConversations();
  renderMessages();

  if (messageInput) {
    messageInput.focus();
  }
};

const deleteConversation = (conversationId) => {
  const exists = state.conversations.some((conversation) => conversation.id === conversationId);
  if (!exists) {
    return;
  }

  state.conversations = state.conversations.filter((conversation) => conversation.id !== conversationId);

  if (state.conversations.length === 0) {
    const fallback = createConversation('Chat 1', 'Hi! This is Chat 1. Start typing your first message.');
    state.conversations = [fallback];
    state.activeConversationId = fallback.id;
  } else if (state.activeConversationId === conversationId) {
    state.activeConversationId = state.conversations[0].id;
  }

  renderConversations();
  renderMessages();

  if (messageInput) {
    messageInput.focus();
  }
};

const getMockReply = (userMessage, conversationTitle) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Mock reply in ${conversationTitle}: I received your message "${userMessage}".`);
    }, 700);
  });
};

const setComposerDisabled = (disabled) => {
  if (messageInput) {
    messageInput.disabled = disabled;
  }

  if (sendButton) {
    sendButton.disabled = disabled;
  }
};

const handleMessageSubmit = async (event) => {
  event.preventDefault();

  if (!messageInput) {
    return;
  }

  const conversation = getActiveConversation();
  if (!conversation) {
    return;
  }

  const userText = messageInput.value.trim();
  if (!userText) {
    return;
  }

  conversation.messages.push({ role: 'user', content: userText });
  renderMessages();

  messageInput.value = '';
  setComposerDisabled(true);

  try {
    const mockReply = await getMockReply(userText, conversation.title);
    conversation.messages.push({ role: 'assistant', content: mockReply });
  } catch (error) {
    conversation.messages.push({ role: 'system', content: 'Mock async flow failed.' });
  } finally {
    setComposerDisabled(false);
    renderMessages();

    if (messageInput) {
      messageInput.focus();
    }
  }
};

const applyUserFromQueryString = () => {
  const params = new URLSearchParams(window.location.search);
  const username = (params.get('username') || '').trim();

  if (!username || !userDisplayNameNode) {
    return;
  }

  userDisplayNameNode.textContent = username;
};

const configureSidebarResizer = () => {
  if (!sidebarResizer || !chatLayout) {
    return;
  }

  let isResizing = false;

  const onMouseMove = (event) => {
    if (!isResizing) {
      return;
    }

    const layoutRect = chatLayout.getBoundingClientRect();
    const desiredWidth = event.clientX - layoutRect.left;
    const clampedWidth = Math.max(SIDEBAR_MIN_WIDTH, Math.min(SIDEBAR_MAX_WIDTH, desiredWidth));

    document.documentElement.style.setProperty('--sidebar-width', `${clampedWidth}px`);
  };

  const onMouseUp = () => {
    if (!isResizing) {
      return;
    }

    isResizing = false;
    sidebarResizer.classList.remove('is-active');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  sidebarResizer.addEventListener('mousedown', (event) => {
    event.preventDefault();
    isResizing = true;
    sidebarResizer.classList.add('is-active');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const bootstrapConversations = () => {
  const first = createConversation('Final project planning', 'Hi! I am UTNito. Ready to help.');
  first.messages.push({ role: 'user', content: 'Can we review class 4 goals quickly?' });
  first.messages.push({ role: 'assistant', content: 'Yes. Today we add DOM events, async flow, local chat state, and UI layout control.' });

  const second = createConversation('REST endpoint questions', 'This chat is ready. Ask me anything about REST.');

  state.conversations = [first, second];
  state.activeConversationId = first.id;
};

const registerEvents = () => {
  if (newChatButton) {
    newChatButton.addEventListener('click', addConversation);
  }

  if (chatList) {
    chatList.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const deleteButton = target.closest('.chat-delete-btn');
      if (deleteButton instanceof HTMLButtonElement) {
        const conversationId = deleteButton.dataset.conversationId;
        if (conversationId) {
          deleteConversation(conversationId);
        }
        return;
      }

      const selectButton = target.closest('.chat-item-btn');
      if (!selectButton) {
        return;
      }

      const conversationId = selectButton.dataset.conversationId;
      if (!conversationId) {
        return;
      }

      selectConversation(conversationId);
    });
  }

  if (messageForm) {
    messageForm.addEventListener('submit', handleMessageSubmit);
  }
};

const init = () => {
  applyUserFromQueryString();
  bootstrapConversations();
  registerEvents();
  configureSidebarResizer();
  renderConversations();
  renderMessages();
};

init();
