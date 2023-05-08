const socket = io();

const titleBook = document.querySelector('input#title');
const titleBtn = document.querySelector('button#title-btn');
const guessBook = document.querySelector('.guess-book section');
const guessBookImg = document.querySelector('.guess-book section div img');
const guessForm = document.querySelector('.guess-book form');
const bookSection = document.querySelector('.guess-book section');
const gameText = document.getElementById('game-text');
const openChatButton = document.getElementById('open-chat');
const retryButton = document.getElementById('retry');

// const username = window.name;
// const genre = window.genre;

let loses = 0;
let guessedBook;

function guessNewBook() {
  retryButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });
}

if (titleBtn) {
  titleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(titleBook.value);
    socket.emit('tryTitleBook', titleBook.value);
  });
}

socket.on('win', (data) => {
  console.log(data);
  guessedBook = data;

  guessBookImg.classList.add('win');
  guessForm.remove();

  // const winText = document.createElement('p');
  // winText.classList.add('win');
  gameText.setAttribute('class', 'show');
  gameText.textContent = 'Gewonnen! Het antwoord was ' + guessedBook;

  // const chatBtn = document.createElement('button');
  // chatBtn.classList.add('open-chat');
  // chatBtn.textContent = 'Open chat';

  openChatButton.setAttribute('class', 'show');
  retryButton.setAttribute('class', 'show');

  // const retryBtn = document.createElement('button');
  // retryBtn.classList.add('retry');
  // retryBtn.textContent = 'Raad een nieuw boek';

  // bookSection.appendChild(winText);
  // bookSection.appendChild(chatBtn);
  // bookSection.appendChild(retryBtn);

  // guessBook.insertAdjacentHTML(
  //   'beforeend',
  //   `<p class="win">Gewonnen! Het antwoord was ${guessedBook}</p> <button class="open-chat" type="submit">Open chat</button> <button class="retry" type="submit">Raad een nieuw boek</button>`
  // );

  const tryAgainText = document.querySelector('.tryagian-text');
  if (tryAgainText) {
    tryAgainText.remove();
  }
  guessNewBook()

});

socket.on('lose', (data) => {
  console.log('Verloren ' + data);

  loses++;
  if (loses <= 3) {
    guessBookImg.classList.add('lose' + loses);
    gameText.setAttribute('class', 'show');
    gameText.textContent = 'Helaas het gegeven antwoord is incorrect. Probeer het nog een keer.';
    // if (!bookSection.querySelector('p')) {
    //   guessBook.insertAdjacentHTML(
    //     'beforeend',
    //     `<p class="tryagian-text">Helaas het gegeven antwoord is incorrect. Probeer het nog een keer.</p>`
    //   );
    // }
  } else if (loses === 4) {
    guessBookImg.classList.add('lose4');
    guessForm.remove();
    // bookSection.querySelector('p').remove();

    gameText.setAttribute('class', 'show');
    gameText.textContent = 'Helaas je hebt het antwoord niet geraden. Het antwoord was ' + data;
    openChatButton.setAttribute('class', 'show');
    retryButton.setAttribute('class', 'show');

    // const loseText = document.createElement('p');
    // loseText.classList.add('lose-text');
    // loseText.textContent = 'Helaas je hebt de titel niet geraden. Het antwoord was ' + data;

    // const chatBtn = document.createElement('button');
    // chatBtn.classList.add('open-chat');
    // chatBtn.textContent = 'Open chat';

    // const retryBtn = document.createElement('button');
    // retryBtn.classList.add('retry');
    // retryBtn.textContent = 'Probeer opnieuw';

    // bookSection.appendChild(loseText);
    // bookSection.appendChild(chatBtn);
    // bookSection.appendChild(retryBtn);

    // guessBook.insertAdjacentHTML(
    //   'beforeend',
    //   `<p class="lose-text">Helaas je hebt de titel niet geraden. Het antwoord was ${data}</p> <form action="/chat-${data}"><button type="submit">Open chat</button></form><button class="retry" type="submit">Probeer opnieuw</button>`
    // );
    guessNewBook()
  }
});

// const openChatBtn = document.querySelector('.guess-book .open-chat');
// console.log(openChatBtn)
openChatButton.addEventListener('click', (e) => {
  // console.log('test ' + JSON.stringify(guessedBook));
  if (!guessedBook) return;
  console.log('test ' + guessedBook);
  const roomName = guessedBook;
  socket.emit('createRoom', roomName);
  console.log('Room created: ' + roomName);
});


// let messages = document.querySelector('.chat section ul');
// let inputName = document.querySelector('.chat input#username');
// let inputText = document.querySelector('.chat input#message');
// let send = document.querySelector('.chat button#send');
// let typingState = document.querySelector('.chat p');
// let chatForm = document.querySelector('.chat form');
// const bookTitle = document.querySelector('input#book-title');

// console.log('CLIENT:' + bookTitle.value);

// socket.emit('guessedBook', guessedBook);

// send text
// if (chatForm) {
//   chatForm.addEventListener('submit', event => {
//     event.preventDefault()
//     let data = { name: inputName.value, message: inputText.value }
//     socket.emit('chat', data);
//     console.log(inputName.value, inputText.value);
//     inputText.value = '';
//   })
// }

// if (inputText) {
//   inputText.addEventListener('keypress', () => {
//     socket.emit('typing', inputName.value)
//   })
// }

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