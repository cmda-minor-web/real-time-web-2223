const messages = document.querySelector('section ul');
const input = document.querySelector('#message-input');
const submit = document.querySelector('#message-button');
const usernameInput = document.querySelector('#username-input');
const usernameSubmit = document.querySelector("#username-button");
var userNames=[];

usernameSubmit.addEventListener('click', (event) => {
    event.preventDefault(); // voorkomt de standaardgedrag van het formulier
    userNames.push(usernameInput.value)
    console.log(userNames);
})

submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
});

socket.on('chat message', (msg) => {
    console.log('chat message: ' + msg);
    const currentUserName = userNames[userNames.length - 1]; // krijg de meest recente gebruikersnaam

    const element = document.createElement('li');
    const userName = document.createElement('p')
    element.textContent = msg;
    userName.textContent = currentUserName;

    element.appendChild(userName);
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
});



