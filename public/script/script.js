// var messages = document.querySelector('main section ul')
// var input = document.querySelector('input[type=text]')
// var submit = document.querySelector('button[type=submit]')


// submit.addEventListener('submit', (e) => {
//   e.preventDefault()
//   if (input.value) {
//     socket.emit('chat message', input.value)
//     console.log(input.value)
//     input.value = ''
//   }
// })

// socket.on('chat message', function(message) {
//     console.log("socket");
//   var element = document.createElement('li')
//   element.textContent = message
//   messages.appendChild(element)
//   messages.scrollTop = messages.scrollHeight
// })


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

