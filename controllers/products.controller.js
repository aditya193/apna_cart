const mysql = require('mysql');
const db = require('../data/database');

function getAllProducts(req, res) {
    var sql = 'SELECT * FROM PRODUCTS';

    db.query(sql, function (err, data) {
        if (err) throw err;
        else {
            res.render('customer/products/all-products', {
                products: data
            });
        }
    });
}

function getProductDetails(req, res, next) {
    productId = req.params.id;
    var sql = 'SELECT * FROM products WHERE id = ? ';
    db.query(sql, productId, function (err, data, fields) {
        if (err) throw err;
        else if (data.length > 0) {
            res.render('customer/products/product-details', {
                product: data[0]
            });
        } else {
            res.render('shared/404');
        }
    });
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductDetails: getProductDetails
};