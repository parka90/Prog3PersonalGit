# Referencia rapida - JavaScript / DOM / Fetch (Clase 04)

## 1) Conectar JS a HTML
```html
<script src="./chat.js" defer></script>
```

## 2) Seleccionar elementos DOM
```js
const form = document.querySelector('#message-form');
const input = document.querySelector('#composer-input');
const messages = document.querySelector('#messages');
```

## 3) Evento submit
```js
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
});
```

## 4) Crear nodos y renderizar
```js
const article = document.createElement('article');
article.className = 'message user';
article.textContent = text;
messages.appendChild(article);
```

## 5) Asincronia inicial
```js
const getMockReply = (text) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(`Mock: ${text}`), 700);
  });
```

## 6) Fetch y JSON
```js
const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const data = await response.json();
```

## 7) Manejo de errores
```js
try {
  const data = await fetchApiTodoSample();
  console.log(data);
} catch (error) {
  console.error(error);
}
```
