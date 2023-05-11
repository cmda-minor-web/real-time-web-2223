// Variables
const socket = io();
const usernameSection = document.querySelector('.username');
const guessBookSection = document.querySelector('.guess-book');
const chatSection = document.querySelector('.chat');

const bookImage = document.querySelector('img.book-image');
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

let messages = document.querySelector('.chat section ul');
let inputName = document.querySelector('.chat input#username');
let inputText = document.querySelector('.chat input#message');
let send = document.querySelector('.chat button#send');
let typingState = document.querySelector('.chat p');
let chatForm = document.querySelector('.chat form');
const bookTitle = document.querySelector('input#book-title');

let username;
let currentUser;
let genre;
let users = [];
let numUsers = 0;
let genreChosen = false;
let loses = 0;
let currentBook;

// Functions
function guessNewBook() {
  // New book to guess
  // retryButton.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   console.log('Show new book1' + JSON.stringify(currentBook.title));
  //   getAPI();
  //   showNewBook();
  // });
}

function getAPI() {
  socket.emit('getAPI');
}

// Functie schrijven om afbeelding book te laten zien
function showNewBook() {
  // console.log('Show new book2' + currentBook);
  gameText.setAttribute('class', 'hidden'); // Hide gameText
  let image = JSON.stringify(currentBook.imageLinks.thumbnail);
  console.log('Show new book3' + image);
  image = image.replace(/\"/g, "");

  bookImage.setAttribute('src', currentBook.image); // Set src of bookImage to data.image
  bookImage.setAttribute('alt', currentBook.title); // Set alt of bookImage to data.title
  bookImage.classList.remove('win'); // Remove win class from guessBookImg
}

getAPI();

// Socket Events
if (startGame) { // Check if startGame exists
  formUsername.addEventListener('submit', (e) => { // Listen for submit event on formUsername
    e.preventDefault();
    const inputUsername = document.querySelector('input#username');
    // console.log('set username: ' + inputUsername.value);
    username = inputUsername.value; // Set username to value of inputUsername
    // console.log('set username2: ' + username);
    socket.emit('newUser', { username: username }); // Send username to server
    // window.location.href = `/raad-het-boek`; // Redirect to game page
    usernameSection.setAttribute('class', 'hidden'); // Show usernameSection
    guessBookSection.setAttribute('class', 'show'); // Show guessBookSection

    const usernameBookPage = document.querySelector('span.username');

    usernameBookPage.textContent = username; // Set textContent of usernameBookPage to username
    let image = JSON.stringify(currentBook.imageLinks.thumbnail);
    image = image.replace(/\"/g, "");
    bookImage.setAttribute('src', image); // Set src of bookImage to data.image
    bookImage.setAttribute('alt', currentBook.title); // Set alt of bookImage to data.title

    bookTitleInput.value = currentBook.title; // Set value of bookTitleInput to data.title
    usernameInput.value = username; // Set value of unsernameInput to username

    console.log('Raad het boek 123' + username, bookTitleInput.value);
    socket.emit('bookCheck', username, bookTitleInput.value);
  });
}

socket.on('randomBook', (data) => {
  // console.log(JSON.stringify(data));
  currentBook = data; // Set currentBook to data
  console.log('Current randomBook: ' + JSON.stringify(currentBook))
});

socket.on('users', (data) => {
  users = data;

  console.log('Users' + JSON.stringify(users));
});

if (titleBtn) { // Check if titleBtn exists
  titleBtn.addEventListener('click', (e) => { // Listen for click event on titleBtn
    e.preventDefault();
    console.log("hallooo" + titleBook.value, usernameInput.value)
    socket.emit('tryTitleBook', titleBook.value, usernameInput.value); // Send titleBook to server
  });
}

if (openChatButton) {
  // const url = new URL(window.location.href);
  // const name = url.pathname.split("/")[2];
  // console.log('Hiiiii' + name)
  openChatButton.addEventListener('click', (e) => {
    if (!currentBook) return; // Check if currentBook exists
    const roomName = currentBook; // Set roomName to currentBook
    // socket.emit('createRoom', roomName); // Create room
    // console.log('Room created: ' + roomName);

    bookSection.setAttribute('class', 'hidden'); // Hide bookSection
    chatSection.setAttribute('class', 'show'); // Show chatSection

    // window.location.href = `/chat/${roomName}/${name}`; // Redirect to chat page
  });
}

socket.on('openChat', (currentUser) => {
  // console.log('Open chat ' + currentUser);
  // currentUser = usernameInput.value;
  if (chatForm) {
    chatForm.addEventListener('submit', event => {
      event.preventDefault()
      console.log('hahhahha' + currentUser)
      let data = { name: username, message: inputText.value }
      console.log('DATA is leuk' + data)
      socket.emit('chat', data);
      console.log(username, inputText.value);
      inputText.value = '';
    })
  }
});


socket.on('win', (data) => {
  console.log('Win' + data);
  currentBook = data; // Set currentBook to data

  guessBookImg.classList.add('win'); // Add win class to guessBookImg
  guessForm.setAttribute('class', 'hidden')

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

socket.on('roomCreated', (roomName, username) => {
  console.log('Room created: ' + roomName + ' with user ' + username);
  window.location.href = '/chat/' + roomName; // Redirect to chat page
});

socket.on("roomJoined", ({ roomName, username }) => {
  console.log(`${username} joined room ${roomName}`);
  console.log(roomName)
  window.location.href = `/chat/${roomName}/${username}`; // Redirect to chat page
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
  const url = new URL(window.location.href);
  const name = url.pathname.split("/")[3];
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

let typingTimer;
const typingDelay = 3000;

inputText.addEventListener('keydown', () => {
  clearTimeout(typingTimer);

  typingState.textContent = '';

  typingTimer = setTimeout(() => {
    socket.emit('stopTyping');
  }, typingDelay);

  socket.emit('typing', { username: username });
});

socket.on('typing', (data) => {
  typingState.textContent = `${data.username} is typing...`;
});

socket.on('stopTyping', () => {
  typingState.textContent = '';
});

function addMessage(data) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }))
  messages.scrollTop = messages.scrollHeight
}