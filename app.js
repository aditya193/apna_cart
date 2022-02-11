const path = require('path');
const env = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

const sql = require('./data/database.js');
env.config();

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

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