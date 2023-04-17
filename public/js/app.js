const socket = io();
const messages = document.querySelector('section ul');
const input = document.querySelector('input');

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value) {
    socket.emit('message', input.value);
    input.value = '';
    }
});

socket.on('message', (message) => {
    const element = document.createElement('li');
    element.textContent = message;
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
});