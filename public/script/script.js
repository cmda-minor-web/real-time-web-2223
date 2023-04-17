const messages = document.querySelector('section ul');
const input = document.querySelector('input[type=text]');
const submit = document.querySelector('button[type=submit]');

submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    console.log('chat message: ' + msg);
    const element = document.createElement('li');
    element.textContent = msg;
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
});

