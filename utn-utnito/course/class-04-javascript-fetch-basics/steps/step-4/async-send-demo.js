const form = document.querySelector('#message-form');
const input = document.querySelector('#message-input');
const sendSyncButton = document.querySelector('#send-sync-btn');
const clearButton = document.querySelector('#clear-btn');
const messages = document.querySelector('#messages');

let sequenceNumber = 0;
const SYNC_BLOCK_MS = 1000;

const appendLine = (role, text) => {
  if (!messages) {
    return;
  }

  const line = document.createElement('p');
  line.className = `line ${role}`;
  line.textContent = text;
  messages.appendChild(line);
  messages.scrollTop = messages.scrollHeight;
};

const getCurrentText = () => {
  return input ? input.value.trim() : '';
};

const getMockReply = (sequence, userText) => {
  const delayMs = 400 + Math.floor(Math.random() * 1000);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Assistant #${sequence} (async): delayed reply for "${userText}" (${delayMs}ms)`);
    }, delayMs);
  });
};

const getBlockingSyncReply = (sequence, userText) => {
  const start = Date.now();

  while (Date.now() - start < SYNC_BLOCK_MS) {
    // Pedagogical demo only: this blocks the main thread on purpose.
  }

  return `Assistant #${sequence} (sync): blocking reply for "${userText}" (${SYNC_BLOCK_MS}ms)`;
};

const sendSyncMessage = () => {
  const text = getCurrentText();
  if (!text) {
    return;
  }

  sequenceNumber += 1;
  const sequence = sequenceNumber;

  appendLine('user', `User #${sequence}: ${text}`);
  const reply = getBlockingSyncReply(sequence, text);
  appendLine('assistant', reply);

  if (input) {
    input.focus();
  }
};

const sendAsyncMessage = async () => {
  const text = getCurrentText();
  if (!text) {
    return;
  }

  sequenceNumber += 1;
  const sequence = sequenceNumber;

  appendLine('user', `User #${sequence}: ${text}`);

  const reply = await getMockReply(sequence, text);
  appendLine('assistant', reply);

  if (input) {
    input.focus();
  }
};

if (sendSyncButton) {
  sendSyncButton.addEventListener('click', sendSyncMessage);
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await sendAsyncMessage();
  });
}

if (clearButton) {
  clearButton.addEventListener('click', () => {
    if (messages) {
      messages.innerHTML = '';
    }

    sequenceNumber = 0;

    if (input) {
      input.focus();
    }
  });
}
