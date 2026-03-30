const messageForm = document.querySelector('.composer');
const messageInput = document.querySelector('#composer-input');

if (messageForm) {
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = messageInput ? messageInput.value.trim() : '';
    console.log('User submitted message:', text);
  });
}
