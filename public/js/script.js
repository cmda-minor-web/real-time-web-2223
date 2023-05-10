// Variables
const socket = io();
const formUsername = document.querySelector('form#form-username');
const startGame = document.querySelector('button#start-game');
const titleBook = document.querySelector('input#title');
const titleBtn = document.querySelector('button#title-btn');
const guessBook = document.querySelector('.guess-book section');
const guessBookImg = document.querySelector('.guess-book section div img');
const guessForm = document.querySelector('.guess-book form');
const bookSection = document.querySelector('.guess-book section');
const gameText = document.getElementById('game-text');
const openChatButton = document.getElementById('open-chat');
const retryButton = document.getElementById('retry');

const bookTitleInput = document.querySelector('input[name="booktitle"]');
const usernameInput = document.querySelector('input[name="username"]');

let username;
let currentUser;
let genre;
let users = [];
let numUsers = 0;
let genreChosen = false;
let loses = 0;
let currentBook;

// window.addEventListener('beforeunload', () => {
//   sessionStorage.clear();
// });

// Functions
function guessNewBook() {
  // New book to guess
  retryButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload(); // Reload page
  });
}

// Events
if (startGame) {
  formUsername.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputUsername = document.querySelector('input#username');
    // const selectGenre = document.querySelector('select#genre');

    username = inputUsername.value;
    // genre = selectGenre.value;
    // console.log(username);
    socket.emit('newUser', { username: username }); // Send username to server

    window.location.href = '/raad-het-boek'; // Redirect to game page
  });
}

if (titleBtn) { // Check if titleBtn exists
  titleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(titleBook.value);
    socket.emit('tryTitleBook', titleBook.value, usernameInput.value); // Send titleBook to server
  });
}

// console.log(usernameInput);
if (window.location.pathname === '/raad-het-boek') {
  socket.emit('bookCheck', usernameInput.value, bookTitleInput.value);
}
// console.log('Book to check: ' + bookTitleInput.value);

// Socket events
socket.on('users', (data) => {
  users = data;
  console.log('Users' + JSON.stringify(users));
});

socket.on('win', (data) => {
  console.log('Win' + data);
  currentBook = data; // Set currentBook to data

  guessBookImg.classList.add('win'); // Add win class to guessBookImg
  guessForm.remove(); // Remove guessForm

  gameText.setAttribute('class', 'show'); // Show gameText
  gameText.textContent = 'Gewonnen! Het antwoord was ' + currentBook; // Set textContent of gameText

  openChatButton.setAttribute('class', 'show'); // Show openChatButton
  retryButton.setAttribute('class', 'show'); // Show retryButton

  guessNewBook() // Call guessNewBook function

});

socket.on('lose', (data) => {
  console.log('Verloren ' + data);
  currentBook = data; // Set currentBook to data

  loses++; // Add 1 to loses
  if (loses <= 3) { // Check if loses is less than or equal to 3
    guessBookImg.classList.add('lose' + loses); // Add lose class to guessBookImg that counts up
    gameText.setAttribute('class', 'show'); // show gameText
    gameText.textContent = 'Helaas het gegeven antwoord is incorrect. Probeer het nog een keer.'; // Set textContent of gameText
  } else if (loses === 4) { // Check if loses is equal to 4
    guessBookImg.classList.add('lose4'); // Add lose4 class to guessBookImg
    guessForm.remove(); // Remove guessForm

    gameText.setAttribute('class', 'show'); // Show gameText
    gameText.textContent = 'Helaas je hebt het antwoord niet geraden. Het antwoord was ' + currentBook; // Set textContent of gameText
    openChatButton.setAttribute('class', 'show'); // Show openChatButton
    retryButton.setAttribute('class', 'show'); // Show retryButton

    guessNewBook() // Call guessNewBook function
  }
});

if (openChatButton) {
  openChatButton.addEventListener('click', (e) => {
    if (!currentBook) return; // Check if currentBook exists
    const roomName = currentBook; // Set roomName to currentBook
    socket.emit('createRoom', roomName); // Create room
    console.log('Room created: ' + roomName);
  });
}

socket.on('roomCreated', (roomName, username) => {
  console.log('Room created: ' + roomName + ' with user ' + username);
  window.location.href = '/chat/' + roomName; // Redirect to chat page
});

socket.on("roomJoined", ({ roomName, username }) => {
  console.log(`${username} joined room ${roomName}`);
  console.log(roomName)
  window.location.href = '/chat/' + roomName;
});


let messages = document.querySelector('.chat section ul');
let inputName = document.querySelector('.chat input#username');
let inputText = document.querySelector('.chat input#message');
let send = document.querySelector('.chat button#send');
let typingState = document.querySelector('.chat p');
let chatForm = document.querySelector('.chat form');
const bookTitle = document.querySelector('input#book-title');

socket.on('openChat', (username) => {
  console.log('Open chat ' + username);
  currentUser = username;
  if (chatForm) {
    chatForm.addEventListener('submit', event => {
      event.preventDefault()
      console.log('hahhahha' + currentUser)
      let data = { name: currentUser, message: inputText.value }
      socket.emit('chat', data);
      console.log(currentUser, inputText.value);
      inputText.value = '';
    })
  }
});

if (inputText) {
  inputText.addEventListener('keypress', () => {
    socket.emit('typing', currentUser)
  })
}

socket.on('history', (history) => {
  history.forEach((data) => {
    addMessage(data)
  })
})

socket.on('chat', (data, username) => {
  let li = document.createElement('li');
  li.textContent = data.name + ': ' + data.message;
  console.log(data.name + ': ' + data.message)

  // Check if the message is sent by the user
  if (data.name === username) {
    console.log('Current user is: ' + username);
    li.classList.add('current-user');
  }

  messages.appendChild(li);
  typingState.innerHTML = "";
  messages.scrollTop = messages.scrollHeight
})

socket.on('typing', (inputName) => {
  console.log(inputName);
  typingState.innerHTML = (inputName + " is aan het typen...")
  setTimeout(() => {
    typingState.innerHTML = "";
  }, 10000);
})

function addMessage(data) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }))
  messages.scrollTop = messages.scrollHeight
}