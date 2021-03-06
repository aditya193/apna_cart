const mysql = require("mysql");
const db = require("../data/database");
const bcrypt = require("bcryptjs");
// Customer Login
exports.getLogin = (req, res, next) => {
  res.render("customer/auth/login");
};

exports.login = async (req, res, next) => {
  var emailAddress = req.body.email;
  var password = req.body.password;
  var sql = "SELECT * FROM USERS WHERE email = ? and password = ?";
  db.query(sql, [emailAddress, password], function (err, data, fields) {
    if (err) throw err;
    // && bcrypt.compare(password, data[0].password)
    if (data.length > 0) {
      var user_id = data.length[0];
      req.session.emailAddress = emailAddress;
      req.session.isAuth = true;
      req.session.isAdmin = false;
      req.session.user_id = data[0].id;
      // console.log(req.session.id);
      req.session.save();
      console.log("congrats logged in!");
      res.redirect("/");
    } else {
      res.render("customer/auth/login", {
        alertMsg: "Your Email Address or password is wrong",
      });
    }
  });
};

// Customer Register

exports.getSignup = (req, res, next) => {
  res.render("customer/auth/signup");
};

exports.signup = async (req, res, next) => {
  var password = req.body.password;
  const hashedPassword = password;
  inputData = {
    email: req.body.email,
    password: hashedPassword,
    name: req.body.fullname,
    contact: req.body.contact,
    address: req.body.address,
    pincode: req.body.pincode,
    city: req.body.city,
    state: req.body.state,
  };

  var confirm_password = req.body.confirm_password;

  var sql = "select * from users where email = ?";
  var regularExpression =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  db.query(sql, [inputData.email], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 1) {
      var msg = inputData.email + "was already exist";
    } else if (confirm_password != password) {
      var msg = "Password & Confirm Password do not Match";
    } else if (!regularExpression.test(password)) {
      var msg =
        "Password must contain at least one upper alphabet,lower alphabet,one digit and one special character";
    } else {
      var sql = "INSERT INTO users SET ?";
      db.query(sql, inputData, function (err, data) {
        if (err) throw err;
      });
      var msg = "Your are successfully registered";
    }

    res.render("customer/auth/signup", {
      alertMsg: msg,
    });
  });
};

// customer logout

exports.logout = (req, res) => {
  // req.session.emailAddress = null;
  // req.session.isAuth = false;
  // req.session.isAdmin = false;
  req.session.destroy();
  res.redirect("/login");
};
