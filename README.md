# BookBuddies

BookBuddies is een chatroom app waar je boeken kunt bespreken met anderen. Daarnaast lijkt het mij ook leuk om een spelletje toe te voegen waar de kaft van het boek geblurd is en je moet raden welk boek het is.

(Image of my project)

## Table of Contents

- [Concept](#concept)
- [Hoe installeer je dit project?](#hoe-installeer-je-dit-project)
-

## Concep

BookBuddies wordt een chatroom waar gebruikers boeken met elkaar kunnen bespreken. Ze kunnen een boek kiezen en daar dan een gesprek over starten in de chatroom. In de chatroom moet je kunnen zien wie er allemaal deelnemen aan het gesprek, wie er online zijn en wie er aan het typen zijn. Daarnaast moet je nieuwe chats aan kunnen maken voor nieuwe boeken, chat kunnen verlaten en prive gesprekken kunnen starten. Als laatste lijkt het mij leuk om een spelletje toe te voegen waar de kaft van het boek geblurd is en je moet raden welk boek het is.

### Benodigde schermen

- Beginscherm waar je je naam in kunt vullen, met het kiezen van een boek of het invullen van een ID van een andere chatroom
- Overzicht van chats waar je aan deelneemt
- Chatroom scherm
- Spelletje scherm

### Feedback

Ik heb feedback gekregen op mijn concept om eerst te beginnen met het maken van het spelletje van het raden van de boeken. Daar kan ik dan uiteindelijk als dat werkt chatrooms aan koppelen. Zodat er een chatroom over het geraden boek begonnen kan worden. Inplaats van het spelletje multipul choice te maken, is het beter om er een input veld aan te koppelen. Hierin kan de titel van het boek ingevuld worden, deze title hoeft niet precies hetzelfde te zijn als de titel van het boek, omdat het anders te moeilijk wordt. Als de titel niet correct is kreeg ik de tip om het boek minder geblured te maken. Ook moet het ingevulde antwoord naar lowercase worden gemaakt, zodat het niet uitmaakt of de gebruiker een hoofdletter gebruikt of niet.

## Hoe installeer je dit project?

Om dit project te installeren moet je eerst de repository clonen naar je lokale machine. Dit doe je door een map te openen waar je de repository in wilt clonen. Vervolgens open je je terminal en typ je het volgende commando:

```
git clone https://github.com/Inevdhoven/real-time-web-2223.git
```

Nu moet je naar de map gaan waar je de repository in hebt gecloned. Dit doe je door het volgende commando in te typen:

```
cd real-time-web-2223
```

Om de dependencies te installeren moet je het volgende commando uitvoeren:

```
npm install
```

Om het project te starten moet je het volgende commando uitvoeren:

```
npm run dev
```

Open het project in je browser door naar localhost:4300 te gaan.

## Hoe gebruik je dit project?

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

### Data modelling/Data life cycle

## License

Dit project valt onder de MIT License. Voor meer informatie over de MIT License klik [hier](LICENSE).

## Bronnen

https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

<!-- Here are some hints for your projects Readme.md! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use MIT. 📜  -->
