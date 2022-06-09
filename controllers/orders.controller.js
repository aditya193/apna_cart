const mysql = require("mysql");
const db = require("../data/database");

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

  res.redirect("/");
};
exports.getOrder = (req, res, next) => {
  var user_id = res.locals.user_id;
  var sql = "SELECT * FROM ORDERS WHERE user_id=?";
  db.query(sql, [user_id], function (err, data) {
    if (data.length > 0) {
      var orders = [];
      data.forEach(function (value) {
        var product_id = value.product_id;
        var sql1 = "SELECT * FROM PRODUCTS WHERE id=?";
        db.query(sql1, [product_id], function (err, result) {
          var order = {
            title: result[0].title,
            path: result[0].path,
            summary: result[0].summary,
            quantity: value.quantity,
            price: value.quantity * result[0].price,
            status: value.is_pending,
            date: value.date,
          };
          console.log(order);
          orders.push(order);
        });
      });
      while (orders.length == 0) {
        console.log(orders);
        res.render("customer/orders/all-orders", {
          orders: orders,
        });
      }
    } else {
      res.render("customer/auth/cart", {
        alertMsg: "You don't have any orders, you can purchase from here",
      });
    }
  });
};
