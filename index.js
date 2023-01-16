const express = require('express'); // подключаем библиотеку express
const path = require('path');
const exphbs = require('express-handlebars'); // подключаем express-handlebars
const homeRoute = require('./routes/home'); // регистрируем роуты из папки routes
const coursesRoute = require('./routes/courses');
const addRoute = require('./routes/add');
const cardRoute = require('./routes/card');

const app = express(); // создаем сервер
// аналог http.createServer(function (req, res))

// создаем объект с настройками для handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

// указываем серверу использовать hbs как движок для рендеринга html-страниц
app.engine('hbs', hbs.engine); // регистрируем в express движок с названием hbs
app.set('view engine', 'hbs'); // устанавливаем в настройках express через метод set
// информацию в поле view engine со значением hbs, указывая тем самым, что для рендеринга 
// html-страниц будет использоваться движок hbs
app.set('views', 'views'); // указываем в поле views папку, где будут храниться шаблоны

app.use(express.static(path.join(__dirname, 'public'))); // к серверу подключаем папку public, в которой будут
// храниться стили, клиентские скрипты и картинки

app.use(express.urlencoded({extended: true})); //

// подключаем роуты к серверу
app.use('/', homeRoute);
app.use('/courses', coursesRoute);
app.use('/add', addRoute);
app.use('/card', cardRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log('Server is started')}); // слушаем сервер на порту 3000
