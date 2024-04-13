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
  res.send('chao mung den voi chung toi');
});

app.get('/flashcard', (req, res) => {
  res.render('flashcard');
});

app.get('/chondapan', (req, res) => {
  res.render('chondapan');
});

app.get('/thuvien', (req, res) => {
  res.render('thuvien');
});

app.get('/addhocphan', (req, res) => {
  res.render('taohpmoi');
});

app.get('/hocphan', (req, res) => {
  res.render('hpcuaban');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('signup');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});