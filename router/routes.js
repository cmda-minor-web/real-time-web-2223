import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();


async function fetchGenres() {
    const res = (await Promise.all([ // Promise.all zorgt ervoor dat alle fetches tegelijkertijd worden uitgevoerd
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:thriller&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`),
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:romance&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`),
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`),
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`)
    ])).map((res) => res.json());

    const jsonResult = await Promise.all(res).then((data) => {
        return data;
    });

    return jsonResult;
}

router.get('/', async function (req, res) {

    res.render('main', { layout: 'index' });
});

router.get('/raad-het-boek', async function (req, res) {
    const name = req.query.username;
    const genre = req.query.genre;
    console.log(name, genre);
    const getGenre = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`);
    const result = await getGenre.json();
    const books = result.items.map((item) => item.volumeInfo);
    // console.log(books);
    const randomBookIndex = Math.floor(Math.random() * books.length);
    randomBook = books[randomBookIndex];
    console.log(randomBook);

    res.render('genres', { layout: 'index', name: name, genre: genre, result: randomBook });
});

export { router }