let socket = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')


const username = window.prompt("Enter the username");
socket.emit('newUser', username);

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    if (input.value) {
        socket.emit('newMessage', input.value)
        input.value = ''
    }
})

// add message
socket.on('sendMessage', message => {
    messages.appendChild(Object.assign(document.createElement('li'), { textContent: message.user +' : '+message.message }))
    messages.scrollTop = messages.scrollHeight
})


