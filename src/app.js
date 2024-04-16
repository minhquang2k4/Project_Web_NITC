const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));

// template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/library', (req, res) => {
  res.render('your-library');
});

app.get('/library/create', (req, res) => {
  res.render('create');
});

app.get('/library/detail', (req, res) => {
  res.render('library-detail');
});

app.get('/library/detail/flashcard', (req, res) => {
  res.render('flashcard');
});

app.get('/library/detail/quizze', (req, res) => {
  res.render('quizze');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
// abcrifj