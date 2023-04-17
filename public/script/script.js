const messages = document.querySelector('section ul');
const input = document.querySelector('#message-input');
const submit = document.querySelector('#message-button');
const usernameInput = document.querySelector('#username-input');
const loggin= document.querySelector('main section:first-of-type')
const chatScreen= document.querySelector('main section:last-of-type')
const logginButton = document.querySelector('main section:first-of-type > button')

chatScreen.classList.add("hidden");

logginButton.addEventListener('click' , () => {
    loggin.classList.add("hidden");
    chatScreen.classList.remove("hidden");

})


input.addEventListener('input', () => {
    const inputValue = input.value;
    // Doe hier iets met de waarde van het invoerveld
    console.log(inputValue);
    // chatScreen.classList.add('focus')
});


submit.addEventListener('click', (event) => {
    chatScreen.classList.remove('focus')

    event.preventDefault();
    if (input.value) {

        const chat ={
            username: usernameInput.value,
            message: input.value
        }

        socket.emit('chat message', chat);
        input.value = '';
      }
});

socket.on('chat message', (msg) => {
    console.log('chat message: ', msg.message);
    chatScreen.classList.add('focus')

    const element = document.createElement('li');
    element.textContent = ` ${msg.username}: ${msg.message} `;

    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
});



