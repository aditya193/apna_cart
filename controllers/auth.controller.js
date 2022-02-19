const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var db = require('../data/database');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'system',
//     database: 'apna_cart',
// });

// Database query promises
// const zeroParamPromise = (sql) => {
//     return new Promise((resolve, reject) => {
//         db.query(sql, (err, results) => {
//             if (err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

// const queryParamPromise = (sql, queryParam) => {
//     return new Promise((resolve, reject) => {
//         db.query(sql, queryParam, (err, results) => {
//             if (err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

// Hash password
// const hashing = (password) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.hash(password, 8, function (err, hashedPassword) {
//             if (err) return reject(err);
//             return resolve(hashedPassword);
//         });
//     });
// };

// 1. ADMIN
// 1.1 Login
exports.getLogin = (req, res, next) => {
    res.render('customer/auth/login');
};

exports.login = async (req, res, next) => {
    // const {
    //     email,
    //     password
    // } = req.body;
    // let errors = [];
    // const sql1 = 'SELECT * FROM USERS WHERE email = ?';
    // const users = await queryParamPromise(sql1, [email]);
    // if (
    //     users.length === 0 ||
    //     !(await bcrypt.compare(password, users[0].password))
    // ) {
    //     errors.push({
    //         msg: 'Email or Password is Incorrect'
    //     });
    //     res.status(401).render('customer/auth/login', {
    //         errors
    //     });
    // } else {
    //     req.session.loggedin = true;
    //     req.session.username = users[0].email;
    //     res.cookie('username', users[0].email);
    //     // res.send(result);
    //     console.log('success you are logged in');
    // }

    var emailAddress = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM USERS WHERE email = ? and password = ?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if (err) throw err
        // && bcrypt.compare(password, data[0].password)
        if (data.length > 0) {
            req.session.loggedinUser = true;
            req.session.emailAddress = emailAddress;
            console.log("congrats logged in!");
            // res.redirect('/dashboard');
        } else {
            res.render('customer/auth/login', {
                alertMsg: "Your Email Address or password is wrong"
            });
        }
    })
};

// 1.2 Register
// ADMIN REGISTER ==> To be commented

// var regularExpression = /^(?=.\d)(?=.[A-Z])(?=.[a-z])(?=.[a-zA-Z!#$%&?@ "])[a-zA-Z0-9!#$%&?@]{8,20}$/;

exports.getSignup = (req, res, next) => {
    res.render('customer/auth/signup');
};

exports.signup = async (req, res, next) => {
    inputData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.fullname,
        contact: req.body.contact,
        address: req.body.address,
        pincode: req.body.pincode,
        city: req.body.city,
        state: req.body.state
    }

    var confirm_password = req.body.confirm_password;

    var sql = 'select * from users where email = ?';
    db.query(sql, [inputData.email], function (err, data, fields) {
        if (err) throw err
        if (data.length > 1) {
            var msg = inputData.email + "was already exist";
        } else if (confirm_password != inputData.password) {
            var msg = "Password & Confirm Password do not Match";
        } else {
            // bcrypt.hash(inputData.password, 8, function (err, hashedPassword) {
            // Store hash in your password DB.
            //     inputData.password = hashedPassword;
            // });
            // console.log(inputData.password);
            // save users data into database
            var sql = 'INSERT INTO users SET ?';
            db.query(sql, inputData, function (err, data) {
                if (err) throw err;
            });
            var msg = "Your are successfully registered";
        }

        res.render('customer/auth/signup', {
            alertMsg: msg
        });

        // let errors = [];
        // if (!regularExpression.test(password)) {
        //     console.log("validate");
        //     errors.push({
        //         msg: 'Password must contain atleast one Upper alphabet, lower alphabet, one digit and one special character'
        //     });
        //     return res.render('customer/auth/signup', {
        //         errors
        //     });
        // } else 

        // if (password !== confirm_password) {
        //     errors.push({
        //         msg: 'password do not match'
        //     });
        //     return res.render('customer/auth/signup', {
        //         errors
        //     });
        // } else {
        //     const sql1 = 'select * from users where email = ?';
        //     const count = (await queryParamPromise(sql1, [email]))[0].count;
        //     if (count !== 0) {
        //         errors.push({
        //             msg: 'That email is already in use'
        //         });
        //         return res.render('customer/auth/signup', {
        //             errors
        //         });
        //     } else {
        //         const hashedPassword = await bcrypt.hash(password, 8);
        //         const sql2 = 'INSERT INTO USERS SET ?';
        //         await queryParamPromise(sql2, {
        //             name: fullname,
        //             email: email,
        //             password: hashedPassword,
        //             contact: contact,
        //             address: address,
        //             pincode: pincode,
        //             city: city,
        //             state: state
        //         });
        //         req.flash('success_msg', 'You are now registered and can log in');
        //         return res.redirect('/login');
        //     }
        // }
    });
};