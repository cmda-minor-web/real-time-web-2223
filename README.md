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

Hier kun je mijn data models bekijken:

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

### Versie 1

<img width="1426" alt="Data lifecycle diagram" src="https://user-images.githubusercontent.com/43877754/236639190-126fd2f5-b482-4f27-b669-b07a11b19989.png">

#### Legenda:

<img width="785" alt="Data lifecycle diagram legenda" src="https://user-images.githubusercontent.com/43877754/236639192-90cecee8-b2bb-47e0-b0aa-d8a4f2bf69e2.png">

### Uitbereiding versie 1: Socket.io client server

<img width="1058" alt="datalifecycle" src="https://github.com/Inevdhoven/real-time-web-2223/assets/43877754/bd801e40-760b-40ff-ba0c-c655bc871a10">

## Real-time events

## License

Dit project valt onder de MIT License. Voor meer informatie over de MIT License klik [hier](LICENSE).

## Bronnen

- [Google Books API](https://developers.google.com/books/docs/v1/using)
- [Socket.io Documentatie](https://socket.io/docs/v4/client-installation/)
- [Handleiding van het toevoegen van Handlebars](https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65)
- [Commandline code in terminal zetten](https://stackoverflow.com/questions/20303826/how-to-highlight-bash-shell-commands-in-markdown)
