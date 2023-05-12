# BookBuddies

BookBuddies is een app waar je boeken kunt raden en er vervolgens een chatroom over kunt starten.

<img width="1440" alt="homepage_real_time_web" src="https://github.com/Inevdhoven/real-time-web-2223/assets/43877754/cb814b50-254a-4c2b-a477-766d67de7f37">

<br>

Bekijk mijn live demo [hier](https://real-time-web-2223.up.railway.app/)

## Inhoud

- [Concept](#concept)
- [Benodigde schermen](#benodigde-schermen)
- [Feedback](#feedback)
- [Hoe installeer je dit project?](#hoe-installeer-je-dit-project)
- [Live zetten](#live-zetten)
- [Hoe gebruik je dit project?](#hoe-gebruik-je-dit-project)
- [Coding style](#coding-style)
- [Over de API](#over-de-api)
  - [Endpoints](#endpoints)
  - [De response van de API call](#de-response-van-de-api-call)
- [Data modelling](#data-modelling)
  - [Versie 1](#versie-1)
- [Spike solution](#spike-solution)
- [Data lifecycle diagram](#data-lifecycle-diagram)
  - [Versie 1](#versie-1)
- [Real-time events](#real-time-events)
- [Mijn proces](#mijn-proces)
- [Het eindresultaat](#het-eindresultaat)
- [License](#license)
- [Bronnen](#bronnen)

## Concept

BookBuddies is een app waar je eerst je username en een genre opgeeft. Vervolgens kun je boeken gaan raden die bij dat genre horen. De boeken hebben een blur over de cover waardoor je echt goed moet kijken om er achter te komen welk boek het is. Als je een fout maakt word het boek steeds minder geblured. Als je het boek geraden hebt wordt het boek zichtbaar en kun je als je dat wilt een chatroom over dat boek starten. In deze chatroom kun je met andere gebruikers praten over het boek.

### Benodigde schermen

- Beginscherm waar de gebruiker zijn username en genre opgeeft
- Spelletje scherm waar de gebruiker het boek kan raden
- Chatroom scherm waar de gebruiker met andere gebruikers kan praten over het boek

### Feedback

Ik heb feedback gekregen op mijn concept om eerst te beginnen met het maken van het spelletje van het raden van de boeken. Daar kan ik dan uiteindelijk als dat werkt chatrooms aan koppelen. Zodat er een chatroom over het geraden boek begonnen kan worden. Inplaats van het spelletje multipul choice te maken, is het beter om er een input veld aan te koppelen. Hierin kan de titel van het boek ingevuld worden, deze title hoeft niet precies hetzelfde te zijn als de titel van het boek, omdat het anders te moeilijk wordt. Als de titel niet correct is kreeg ik de tip om het boek minder geblured te maken. Ook moet het ingevulde antwoord naar lowercase worden gemaakt, zodat het niet uitmaakt of de gebruiker een hoofdletter gebruikt of niet.

## Hoe installeer je dit project?

Om dit project te installeren moet je eerst de repository clonen naar je lokale machine. Dit doe je door een map te openen waar je de repository in wilt clonen. Vervolgens open je je terminal en typ je het volgende commando:

```bash
git clone https://github.com/Inevdhoven/real-time-web-2223.git
```

Nu moet je naar de map gaan waar je de repository in hebt gecloned. Dit doe je door het volgende commando in te typen:

```bash
cd real-time-web-2223
```

Om de dependencies te installeren moet je het volgende commando uitvoeren:

```bash
npm install
```

Om het project te starten moet je het volgende commando uitvoeren:

```bash
npm run dev
```

Open het project in je browser door naar localhost:4300 te gaan.

Om de covers van de boeken te kunnen zien heb je een API key nodig van de [Google Books API](https://developers.google.com/books/docs/v1/using). Google heeft een plek waar je al je API keys kunt aanmaken en dat is [hier](https://console.cloud.google.com/apis/credentials).Hier maak je een project aan en daar maak je dan nieuwe keys bij aan. Deze API key moet je in een .env bestand zetten. Dit bestand moet je zelf aanmaken in de root van je project. Het plaatsen van de code doe je als volgt:

```
API_KEY=YOUR_API_KEY
```

## Live zetten

Je kunt jouw versie van je applicatie live te hosten kun je gebruik maken van Adaptable. Om dit te doen moet je eerst een account aanmaken op [Adaptable](https://adaptable.io/). Je kunt je GitHub aan Adaptable linken waardoor je op een makkelijke manier de repository die je wilt hosten kunt selecteren. Volg daarna het stappenplan en geef je live site een naam. Wanneer hij klaar is met deployen krijg je een link naar je live site.

## Hoe gebruik je dit project?

Om te kunnen beginnen met het raden van het geblurde boek moet de gebruiker eerst een username en een genre opgeven. Als de gebruiker dit heeft gedaan kan de gebruiker beginnen met het raden van het boek. Als de gebruiker het boek geraden heeft kan hij een chatroom starten over dat boek of een nieuw boek raden. Wanneer de gebruiker een fout antwoord geeft op het raden van het boek word het boek drie keer minder geblurd gemaakt. Bij de vierde keer dat het fout geraden word krijgt hij de cover te zien en kan hij of een chatroom starten of een nieuw boek raden. In de chatroom is het de bedoeling dat de gebruikers met elkaar over de boeken kunnen praten.

## Coding style

Om ervoor te zorgen dat de code goed leesbaar is, heb ik een aantal regels opgesteld waar ik mij aan wil houden.

**Html**

- Schrijf semantische HTML en gebruik niet onnodige `<div>`'s
- Schrijf comments waar nodig om de code te verduidelijken

**CSS**

- Maak gebruik van CSS variabelen
- Groepeer CSS met comments, alles van hetzelfde onderdeel bij elkaar
- Gebruik relatieve eenheden voor afmetingen (Rem, em, %, etc.)

**Javascript**

- Gebruik camelCase voor variabelen
- Gebruik const en let in plaats van var
- Schrijf comments waar nodig om de code te verduidelijken
- Gebruik arrow functions

## Over de API

De API die ik wil gaan gebruiken is de [Google Books API](https://developers.google.com/books/docs/v1/using). Dit is een API die je toegang geeft tot de boeken die Google beschikbaar heeft. Je kunt hierdoor bijvoorbeeld de inhoud van een boek opvragen, maar ook de cover. De API is gratis te gebruiken, maar je moet wel een API key aanvragen. Deze API key is nodig om de API te kunnen gebruiken. Met deze API key krijgt je 50.000 requests per dag.

### API key

Om de covers van de boeken te kunnen zien heb je een API key nodig van de [Google Books API](https://developers.google.com/books/docs/v1/using). Google heeft een plek waar je al je API keys kunt aanmaken en dat is [hier](https://console.cloud.google.com/apis/credentials). Hier maak je een project aan en daar maak je dan nieuwe keys bij aan. Deze API key moet je in een .env bestand zetten. Dit bestand moet je zelf aanmaken in de root van je project. Het plaatsen van de code doe je als volgt:

```
API_KEY=YOUR_API_KEY
```

### Endpoints

Om de 20 meest relevante thriller boeken op te halen kun je het volgende endpoint gebruiken:

`https://www.googleapis.com/books/v1/volumes?q=subject:thriller&orderBy=relevance&maxResults=20&key=YOUR_API_KEY`

Door bij q=subject:thriller het woord thriller te veranderen in een ander genre kun je de 20 boeken van dat genre ophalen. De genres die ik wil gaan gebruiken zijn: thriller, fantasy, romance en fiction.

### De response van de API call

De response in Insomnia ziet er als volgt uit:

<img width="1439" alt="Insomnia response" src="https://user-images.githubusercontent.com/43877754/236639142-f4a532b5-1a71-4839-bb47-61d2bba4d50b.png">

Het volledige response van een boek uit de lijst van 20 in JSON ziet er als volgt uit:

```json
{
  "kind": "books#volume",
  "id": "-PBEDAAAQBAJ",
  "etag": "jd6KeK1JzVU",
  "selfLink": "https://www.googleapis.com/books/v1/volumes/-PBEDAAAQBAJ",
  "volumeInfo": {
    "title": "Trust No One",
    "subtitle": "A Thriller",
    "authors": ["Paul Cleave"],
    "publisher": "Simon and Schuster",
    "publishedDate": "2016-06-07",
    "description": "Jerry Grey is known to most of the world by his crime writing pseudonym, Henry Cutter--a name that has been keeping readers at the edge of their seats for more than a decade. Recently diagnosed with early onset Alzheimer's at the age of forty-nine, Jerry's crime writing days are coming to an end. His twelve books tell stories of brutal murders committed by bad men, of a world out of balance, of victims finding the darkest forms of justice. As his dementia begins to break down the wall between his life and the lives of the characters he has created, Jerry confesses his worst secret: The stories are real. He knows this because he committed the crimes. Those close to him, including the nurses at the care home where he now lives, insist that it is all in his head, that his memory is being toyed with and manipulated by his unfortunate disease. But if that were true, then why are so many bad things happening? Why are people dying?",
    "industryIdentifiers": [
      {
        "type": "ISBN_13",
        "identifier": "9781501103674"
      },
      {
        "type": "ISBN_10",
        "identifier": "1501103679"
      }
    ],
    "readingModes": {
      "text": false,
      "image": false
    },
    "pageCount": 352,
    "printType": "BOOK",
    "categories": ["Fiction"],
    "averageRating": 4,
    "ratingsCount": 19,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "0.3.2.0.preview.0",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=-PBEDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=-PBEDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.nl/books?id=-PBEDAAAQBAJ&printsec=frontcover&dq=subject:thriller&hl=&cd=11&source=gbs_api",
    "infoLink": "http://books.google.nl/books?id=-PBEDAAAQBAJ&dq=subject:thriller&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Trust_No_One.html?hl=&id=-PBEDAAAQBAJ"
  },
  "saleInfo": {
    "country": "NL",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
  },
  "accessInfo": {
    "country": "NL",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
    "epub": {
      "isAvailable": false
    },
    "pdf": {
      "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=-PBEDAAAQBAJ&hl=&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
  }
}
```

## Data modelling

Om in kaart te brengen wat ik allemaal nodig heb uit mijn API call heb ik een data model gemaakt. Wanneer je een call doet naar de API krijg je een lijst met verschillende boeken terug. In deze lijst krijg je voor elk boek onder andere deze data terug, waarvan ik gebruik wil maken:

### Versie 1

![Datamodel Versie 1](https://user-images.githubusercontent.com/43877754/236639166-bcf0f59f-772f-4428-bbe8-214e7ac9bc8c.jpeg)

## Spike solution

Om te kijken of de API die ik heb gekozen goed werkt ben ik eerst gaan kijken of ik random boeken kon ophalen uit een specifieke genre. Dit heb ik gedaan door de volgende code te gebruiken:

```js
app.get("/raad-het-boek", async function (req, res) {
  // Het genre dat ik wil ophalen
  const genre = "thriller";
  // De API call
  const bookByGenre = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`
  );
  // De resultaten van de API call omzetten naar JSON
  const resultBooks = await bookByGenre.json();
  // De resultaten van de API call filteren op de data die ik nodig heb
  const resultBook = resultBooks.items.map((item) => item.volumeInfo);

  // Een random boek uit de resultaten genereren
  const randomBookIndex = Math.floor(Math.random() * resultBook.length);
  // Het random boek uit de resultaten halen
  const book = resultBook[randomBookIndex];

  res.render("genres", { layout: "index", genre: genre, result: book });
});
```

## Data lifecycle diagram

Ik heb twee soorten data lifecycle diagrammen gemaakt, bij de eerst zie je het pad die de gebruiker zou moeten bewandelen. Met daaronder een legenda die uitlegt wat de verschillende kleuren en vormen precies betekenen. Bij de tweede zie je wat er gebeurd met de de verschillende sockets die ik heb aangemaakt. Er word data van de client naar de server gestuurd en andersom.

### Versie 1

<img width="1426" alt="Data lifecycle diagram" src="https://user-images.githubusercontent.com/43877754/236639190-126fd2f5-b482-4f27-b669-b07a11b19989.png">

#### Legenda:

<img width="785" alt="Data lifecycle diagram legenda" src="https://user-images.githubusercontent.com/43877754/236639192-90cecee8-b2bb-47e0-b0aa-d8a4f2bf69e2.png">

### Uitbereiding versie 1: Socket.io client server

<img width="1058" alt="datalifecycle" src="https://github.com/Inevdhoven/real-time-web-2223/assets/43877754/bd801e40-760b-40ff-ba0c-c655bc871a10">

## Real-time events

<details>
  <summary>Socket event: Connection</summary>
 Als de gebruiker verbinding heeft gemaakt met de server komt er in de console aan de kant van de server te staan dat er een gebruiker verbonden is. Dit doe je door de volgende code te gebruiken:

```javascript
//Serverside
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected"); // Log user when disconnected
  });
});
```

In de code zie je ook dat er een disconnect event is. Dit event word aangeroepen wanneer de gebruiker de verbinding verbreekt. Wanneer de gebruiker de verbinding verbreekt komt er in de console aan de kant van de server te staan dat de gebruiker is disconnected. Op deze manier weet je wanneer de gebruiker diconnected is.

</details>
<details>
  <summary>Socket event: Get API</summary>
  Wanneer je de website opent word er een socket event aangeroepen die de API ophaalt door een emit naar de server te sturen. Dit doe je met de volgende code aan de clientside:

```javascript
// Clientside
function getAPI() {
  socket.emit("getAPI"); // Send getAPI to server
}
```

In server.js maak je vervolgens een socket event aan die luistert naar getAPI. Wanneer deze socket event word aangeroepen word er een functie aangeroepen die de API ophaalt en een random boek uit de resultaten haalt. Dit doe je met de volgende code:

```javascript
// Serverside
socket.on("getAPI", async () => {
  // Listen for getAPI
  books = await fetchGenre(genre); // Fetch books by genre

  currentBook = await getRandomBook(); // Get random book

  console.log("Current Book: " + currentBook);

  socket.emit("randomBook", currentBook); // Send random book to client
});

async function fetchGenre(genre) {
  const bookQueryByGenre = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=relevance&maxResults=20&key=${process.env.API_KEY}`
  ); // Fetch books by genre
  const result = await bookQueryByGenre.json(); // Convert to JSON
  return result.items.map((item) => item.volumeInfo); // Return array of books
}

function getRandomBook() {
  const randomBookIndex = Math.floor(Math.random() * books.length); // Get random book index
  return books[randomBookIndex]; // Return random book
}
```

Het random boek word vervolgens naar de client gestuurd door middel van een emit. Deze word dan aan de clientside aangemaakt en hierin word de data opgeslagen in een variable. Dit doe je met de volgende code:

```javascript
// Clientside
socket.on("randomBook", (data) => {
  currentBook = data; // Set currentBook to data
  showNewBook(); // Call showNewBook function
});
```

</details>
<details>
  <summary>Socket event: New User</summary>
  Wanneer een gebruiker zijn username heeft opgegeven wordt deze toegevoegd aan een lijst met users. Dit gebeurd door een socket emit waarbij de username wordt meegestuurd. Dit heb ik als volgt gedaan:

```javascript
// Clientside
socket.emit("newUser", { username: username });
```

Dan word er aan de serverside een nieuwe socket.on aangemaakt met new user waar in een object de username, id en bookToCheck worden toegevoegd. Wanneer deze onderdelen zijn angemaakt worden deze naar de variable users gepust, zodat er een lijst van gebruikers ontstaat. Vervolgens worden deze users naar de client gestuurd doormiddel van de io.emit.

```javascript
// Serverside
socket.on("newUser", (data) => {
  username = data.username; // Set username to data.username
  const user = {
    // Create user object with username and socket id
    username: data.username,
    id: socket.id,
    bookToCheck: "",
  };
  users.push(user); // Push user to users array
  io.emit("users", users); // Send users to client
});
```

In de client word de data met de users in een variabel users gestopt.

```javascript
// Clientside
socket.on("users", (data) => {
  users = data; // Set users to data
});
```

</details>
<details>
  <summary>Socket event: Try Title Book</summary>
  Via de `socket.emit('tryTitleBook')` worden ook de value uit een input waar de gebruiker de titel van het boek heeft ingevuld en de username meegestuurd naar de server.

```javascript
// Clientside
socket.emit("tryTitleBook", titleBook.value, usernameInput.value);
```

Vervolgens heb ik in de serverside een socket.on aan gemaakt met daarin het antwoord dat de gebruiker heeft ingevuld en de username. Eerst word het boek dat geraden moet worden toegevoegd aan de user. Vervolgens word er gekeken of het antwoord dat de gebruiker heeft gegeven ook gelijk is aan het boek dat moet worden geraden. Als dit het geval is word er een `socket.emit('win')` naar de client gestuurd met de currentBookTitle. Wanneer dit niet het geval is word er een `socket.emit('lose')` naar de client gestuurd met de currentBooTitle.

```javascript
//Serverside
socket.on("tryTitleBook", async (titleBook, usernameInput) => {
  const guessedTitleBook = titleBook.toLowerCase();
  let book = "";
  users.forEach((user) => {
    if (user.username == usernameInput) {
      console.log("BookCheck user book " + user.bookToCheck);
      book = user.bookToCheck;
    }
  });

  const currentBookTitle = book;
  console.log("currentBookTitle: " + currentBookTitle);
  const currentBookTitleLowerCase = currentBookTitle.toLowerCase();

  if (guessedTitleBook === currentBookTitleLowerCase) {
    socket.emit("win", currentBookTitle);
  } else {
    socket.emit("lose", currentBookTitle);
  }
});
```

Aan de clientside maak ik dan een `socket.on('win')` en `socket.on('lose')` aan die laten zien wat er wel en niet weergeven moet worden.

</details>
<details>
  <summary>Socket event: Book Check</summary>
  Elke keer dat er een nieuw book wordt aangemaakt word er een via de `socket.emit('book Check')` de username en de titel van het boek meegegeven.

```javascript
// clientside
socket.emit("bookCheck", username, bookTitleInput.value);
```

Aan de serverside heb ik een socket.on aangemaakt hierin word het meegegeven book aan de variabel users toegevoegd aan de user die het boek aan het raden is.

```javascript
// Serverside
socket.on("bookCheck", (usernameInput, bookTitleInput) => {
  users.forEach((user, i) => {
    if (user.username == usernameInput) {
      currentUser = usernameInput;
      user.bookToCheck = bookTitleInput;
      users[i] = user;
    }
  });
});
```

</details>
<details>
  <summary>Socket event: Creat Room</summary>
  hallo
</details>
<details>
  <summary>Socket event: Open Chat</summary>
  hallo

```javascript
// Serverside
socket.emit("openChat", currentUser);
```

```javascript
// Clientside
socket.on("openChat", (currentUser) => {
  if (chatForm) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let data = { name: username, message: inputText.value };
      socket.emit("chat", data);
      inputText.value = "";
    });
  }
});
```

</details>
<details>
  <summary>Socket event: Chat</summary>
  hallo

```javascript
// Clientside
socket.emit("chat", data);
```

```javascript
// Serverside
socket.on("chat", (data) => {
  username = data.username;
  while (history.length > historySize) {
    history.shift();
  }
  history.push(data);
  io.sockets.emit("chat", data, username);
});
```

</details>
<details>
  <summary>Socket event: History</summary>
  hallo
</details>
<details>
  <summary>Socket event: Typing</summary>
  hallo
</details>

## Mijn proces

## Het eindresultaat

## License

Dit project valt onder de MIT License. Voor meer informatie over de MIT License klik [hier](LICENSE).

## Bronnen

- [Google Books API](https://developers.google.com/books/docs/v1/using)
- [Socket.io Documentatie](https://socket.io/docs/v4/client-installation/)
- [Handleiding van het toevoegen van Handlebars](https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65)
- [Commandline code in terminal zetten](https://stackoverflow.com/questions/20303826/how-to-highlight-bash-shell-commands-in-markdown)
