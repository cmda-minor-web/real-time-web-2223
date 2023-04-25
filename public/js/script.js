const socket = io();

const titleBook = document.querySelector('input#title');
const titleBtn = document.querySelector('button#title-btn');

titleBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(titleBook.value);
  socket.emit('tryTitleBook', titleBook.value);
});



// let messages = document.querySelector('section ul');
// let inputText = document.querySelector('input#message');
// let inputName = document.querySelector('input#name');
// let send = document.querySelector('button#send');
// let typingState = document.querySelector('p');

// send text
// document.querySelector('form').addEventListener('submit', event => {
//   event.preventDefault()
//   let data = { name: inputName.value, message: inputText.value }
//   socket.emit('chat', data);
//   console.log(inputName.value, inputText.value);
//   inputText.value = '';
// })

// inputText.addEventListener('keypress', () => {
//   socket.emit('typing', inputName.value)
// })

// socket.on('history', (history) => {
//   history.forEach((data) => {
//     addMessage(data)
//   })
// })

// socket.on('chat', (data) => {
//   let li = document.createElement('li');
//   li.textContent = data.name + ': ' + data.message;

//   // Check if the message is sent by the user
//   if (data.name === inputName.value) {
//     li.classList.add('current-user');
//   }

//   messages.appendChild(li);
//   typingState.innerHTML = "";
//   messages.scrollTop = messages.scrollHeight
// })

// socket.on('typing', (inputName) => {
//   console.log(inputName);
//   typingState.innerHTML = (inputName + " is aan het typen...")
//   setTimeout(() => {
//     typingState.innerHTML = "";
//   }, 3000);
// })

// function addMessage(data) {
//   messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }))
//   messages.scrollTop = messages.scrollHeight
// }