const path = require('path');
const env = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const csrf = require('csurf');

const sql = require('./data/database.js');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
env.config();

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(csrf());
app.use(addCsrfTokenMiddleware);

sql.connect();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(flash());

app.use(authRoutes);

app.listen(3000);