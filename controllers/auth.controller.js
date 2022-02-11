const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'apna_cart',
});

// Database query promises
const zeroParamPromise = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

const queryParamPromise = (sql, queryParam) => {
    return new Promise((resolve, reject) => {
        db.query(sql, queryParam, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// Hash password
const hashing = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8, function (err, hashedPassword) {
            if (err) return reject(err);
            return resolve(hashedPassword);
        });
    });
};

// 1. ADMIN
// 1.1 Login
exports.getLogin = (req, res, next) => {
    res.render('customer/auth/login');
};

exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    let errors = [];
    const sql1 = 'SELECT * FROM USERS WHERE email = ?';
    const users = await queryParamPromise(sql1, [email]);
    if (
        users.length === 0 ||
        !(await bcrypt.compare(password, users[0].password))
    ) {
        errors.push({
            msg: 'Email or Password is Incorrect'
        });
        res.status(401).render('customer/auth/login', {
            errors
        });
    } else {
        // const token = jwt.sign({
        //     id: users[0].admin_id
        // }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXPIRE,
        // });
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000,
        // });
        // res.write('/admin/dashboard');
        console.log('success you are logged in');
    }
};

// 1.2 Register
// ADMIN REGISTER ==> To be commented

// var regularExpression = /^(?=.\d)(?=.[A-Z])(?=.[a-z])(?=.[a-zA-Z!#$%&?@ "])[a-zA-Z0-9!#$%&?@]{8,20}$/;

exports.getSignup = (req, res, next) => {
    res.render('customer/auth/signup');
};

exports.signup = async (req, res, next) => {
    const {
        email,
        password,
        confirm_password,
        fullname,
        contact,
        address,
        pincode,
        city,
        state
    } = req.body;

    let errors = [];
    // if (!regularExpression.test(password)) {
    //     console.log("validate");
    //     errors.push({
    //         msg: 'Password must contain atleast one Upper alphabet, lower alphabet, one digit and one special character'
    //     });
    //     return res.render('customer/auth/signup', {
    //         errors
    //     });
    // } else 

    if (password !== confirm_password) {
        errors.push({
            msg: 'password do not match'
        });
        return res.render('customer/auth/signup', {
            errors
        });
    } else {
        const sql1 = 'select count(*) as `count` from users where email = ?';
        const count = (await queryParamPromise(sql1, [email]))[0].count;
        if (count !== 0) {
            errors.push({
                msg: 'That email is already in use'
            });
            return res.render('customer/auth/signup', {
                errors
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 8);
            const sql2 = 'INSERT INTO USERS SET ?';
            await queryParamPromise(sql2, {
                name: fullname,
                email: email,
                password: hashedPassword,
                contact: contact,
                address: address,
                pincode: pincode,
                city: city,
                state: state
            });
            req.flash('success_msg', 'You are now registered and can log in');
            return res.redirect('/login');
        }
    }
};