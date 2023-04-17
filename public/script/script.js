const messages = document.querySelector('section ul');
const input = document.querySelector('#message-input');
const submit = document.querySelector('#message-button');
const usernameInput = document.querySelector('#username-input');
const usernameSubmit = document.querySelector("#username-button");
var userName;

usernameSubmit.addEventListener('click', (event) => {
    event.preventDefault(); // voorkomt de standaardgedrag van het formulier
    userName = usernameInput.value;
    console.log(userName);
})


console.log("userName", userName);


submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
});

socket.on('chat message', (msg) => {
    console.log("userName", userName);
    console.log('chat message: ' + msg);
    const element = document.createElement('li');
    const name = document.createElement('p')
    element.textContent = msg;
    name.textContent = userName;
    element.appendChild(name);
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
});



