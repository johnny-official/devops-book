const express = require('express');

const app = express();

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/name/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

// app.get('/name/:name', (req, res) => {
//   res.send(`Hello, ${req.params.name}!`);
// });

module.exports = app;
