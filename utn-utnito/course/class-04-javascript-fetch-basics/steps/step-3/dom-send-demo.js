const form = document.querySelector('#message-form');
const input = document.querySelector('#message-input');
const messages = document.querySelector('#messages');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = input ? input.value.trim() : '';
    if (!text || !messages) {
      return;
    }

    const line = document.createElement('p');
    line.textContent = text;
    messages.appendChild(line);

    if (input) {
      input.value = '';
      input.focus();
    }
  });
}
