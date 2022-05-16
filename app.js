const path = require('path');
const env = require('dotenv');

var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const sql = require('./data/database.js');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const cartMiddleware = require('./middlewares/cart');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();
env.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(cookieParser());

app.use(
    session({
        // key: "userId",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000,
        },
    })
);

app.use(csrf());
app.use(cartMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(errorHandlerMiddleware);
app.use(protectRoutesMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(adminRoutes);
app.use(cartRoutes);

app.listen(3000);