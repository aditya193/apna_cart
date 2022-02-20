const path = require('path');
const env = require('dotenv');

var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const csrf = require('csurf');

const sql = require('./data/database.js');
// const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
env.config();

const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use(csrf());
// app.use(addCsrfTokenMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(
    session({
        // key: "userId",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(adminRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

app.listen(3000);

// module.exports = app;