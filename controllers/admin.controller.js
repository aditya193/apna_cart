const mysql = require('mysql');
const db = require('../data/database');

function getLogin(req, res, next) {
    res.render('admin/auth/login');
};

function login(req, res, next) {
    var emailAddress = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM admin WHERE emailAddress = ? and password = ?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if (err) throw err
        // && bcrypt.compare(password, data[0].password)
        if (data.length > 0) {
            req.session.emailAddress = emailAddress;
            req.session.isAuth = false;
            req.session.isAdmin = true;
            console.log("congrats logged in as admin!");
            res.redirect('/admin/products');
        } else {
            res.render('admin/auth/login', {
                alertMsg: "Your Email Address or password is wrong"
            });
        }
    })
};

function logout(req, res) {
    // req.session.emailAddress = null;
    // req.session.isAuth = false;
    // req.session.isAdmin = false;
    req.session.destroy();
    res.redirect('/login');
};


function getProduct(req, res) {
    var sql = 'SELECT * FROM PRODUCTS';

    db.query(sql, function (err, data) {
        if (err) throw err;
        else {
            // console.log(data)
            res.render('admin/product/all-products', {
                products: data
            });
        }
    });
}

function getNewProduct(req, res) {
    res.render('admin/product/new-product');
}

function createNewProduct(req, res) {
    // console.log(req.body);
    // console.log(req.file.path);
    inputData = {
        title: req.body.title,
        image: req.file,
        path: req.file.path,
        summary: req.body.summary,
        description: req.body.description,
        price: req.body.price
    }
    var sql = 'INSERT INTO products SET ?';
    db.query(sql, inputData, function (err, data) {
        if (err) throw err;
    });
    res.redirect('/admin/products');

}

function getUpdateProduct(req, res) {
    // console.log(3);
    productId = req.params.id;
    var sql = 'SELECT * FROM products WHERE id = ? ';
    db.query(sql, productId, function (err, data, fields) {
        if (err) throw err;
        else if (!data)
            res.render('admin/product/all-products', alertMsg = "No Record Found!!");
        else {
            // console.log(data);
            res.render('admin/product/update-product', {
                product: data
            });
        }
    });
}


function updateProduct(req, res) {
    //  console.log(4);
    productId = req.params.id;
    var sql = 'SELECT * FROM products WHERE id = ? ';
    db.query(sql, productId, function (err, data, fields) {
        if (err) throw err;
        else if (!data)
            res.render('admin/product/all-products', {
                alertMsg: "No Record Found!!"
            });
        else {
            data[0].title = req.body.title;
            data[0].summary = req.body.summary;
            data[0].description = req.body.description;
            data[0].price = req.body.price;
            data[0].image = req.file;
            data[0].path = req.file.path;
            res.render('admin/product/all-product', {
                alertMsg: "record successfully updated"
            });
        }
    });
}

function deleteProduct(req, res) {
    console.log(5);
    productId = req.params.id;
    var sql = 'DELETE FROM products WHERE id = ? ';
    db.query(sql, productId, function (err, data, fields) {
        if (err) throw err;
        else if (!data)
            res.render('admin/product/all-products', {
                alertMsg: "No Record Found!!"
            });
        else {
            console.log(productId);
            res.render('admin/product/all-products', {
                alertMsg: "Record Successfully deleted"
            });
        }
    });
}

module.exports = {
    getLogin: getLogin,
    login: login,
    logout: logout,
    getProduct: getProduct,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
};