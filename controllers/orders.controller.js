const mysql = require("mysql");
const db = require("../data/database");

exports.getOrders = (req, res) => {
    res.render("customer/orders/all-orders");
};

exports.addOrder = (req, res, next) => {
    const cart = res.locals.cart;
    console.log(res.locals);
    var user_id;
    user_id = res.locals.user_id;
    //console.log(user_id);
    for (let i = 0; i < cart.items.length; i++) {
        var sql2 = "INSERT INTO ORDERS SET ?";
        inputData = {
            user_id: user_id,
            product_id: cart.items[i].product.id,
            quantity: cart.items[i].quantity,
            is_pending: 1,
        };
        db.query(sql2, inputData, function (err, data) {
            if (err) throw err;
        });
    }
    console.log(cart);
    req.session.cart = null;

    res.redirect("/");
};
