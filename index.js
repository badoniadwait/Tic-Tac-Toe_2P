const express = require('express');
const { resolve } = require('path');

const router = require('./routes/game');

const app = express();

const port = 3000;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(resolve('./public')));



app.set('view engine', 'ejs');
app.set('views', resolve('./views'))

app.use(router);

app.listen(port, () => { console.log('Tic Tac Toe running at port ', port) });