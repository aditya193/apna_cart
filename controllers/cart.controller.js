const mysql = require("mysql");
const db = require("../data/database");

const queryParamPromise = (sql, queryParam) => {
    return new Promise((resolve, reject) => {
        db.query(sql, queryParam, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

exports.getCart = (req, res) => {
    console.log(req.session.cart);
    res.render("customer/cart/cart");
};

exports.addCartItem = async (req, res, next) => {
    let product;
    var sql = "SELECT * FROM products WHERE id = ? ";
    product = (await queryParamPromise(sql, [req.body.productId]))[0];

    // console.log(req.body.productId);

    console.log(product);
    const cart = res.locals.cart;

    cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message: "Cart updated!",
        newTotalItems: cart.totalQuantity,
    });
};

exports.updateCartItem = (req, res) => {
    const cart = res.locals.cart;
    console.log(req.body);

    const updatedItemData = cart.updateItem(
        req.body.productId,
        req.body.quantity
    );

    req.session.cart = cart;

    res.json({
        message: "Item updated!",
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
        },
    });
};
