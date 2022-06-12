const mysql = require("mysql");
const db = require("../data/database");

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  // console.log(res.locals);
  var user_id;
  user_id = res.locals.user_id;
  //console.log(user_id);
  for (let i = 0; i < cart.items.length; i++) {
    var sql2 = "INSERT INTO ORDERS SET ?";
    inputData = {
      user_id: user_id,
      product_id: cart.items[i].product.id,
      admin_id: cart.items[i].product.admin_id,
      quantity: cart.items[i].quantity,
      is_pending: 1,
    };
    db.query(sql2, inputData, function (err, data) {
      if (err) throw err;
    });
  }
  // console.log(cart);

  res.redirect("/");
}

async function getOrder(req, res, next) {
  var user_id = res.locals.user_id;
  var sql = "SELECT * FROM ORDERS WHERE user_id=?";
  var orders = [];
  await db.query(sql, [user_id], async function (err, data) {
    if (data.length > 0) {
      for (const value of data) {
        var product_id = value.product_id;
        var sql1 = "SELECT * FROM PRODUCTS WHERE id=?";
        await db.query(sql1, [product_id], async function (err, result) {
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
      }
    }
  });
  setTimeout(() => {
    console.log(orders);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  }, 2000);
}

async function manageOrder(req, res, next) {
  var admin_id = res.locals.admin_id;
  var sql = "SELECT * FROM ORDERS WHERE admin_id=?";
  var user_details = [];
  var product_details = [];
  await db.query(sql, [admin_id], async function (err, data) {
    if (data.length > 0) {
      for (const value of data) {
        var user_id = value.user_id;
        var sql1 = "SELECT * FROM USERS WHERE id=?";
        await db.query(sql1, [user_id], async function (err, result) {
          var user_name = result[0].name;
          var user_contact = result[0].contact;
          var user_address = result[0].address;
          var detail = {
            user_name: user_name,
            user_contact: user_contact,
            user_address: user_address,
          };
          user_details.push(detail);
        });
        var product_id = value.product_id;
        var sql2 = "SELECT * FROM PRODUCTS WHERE id=?";
        await db.query(sql2, [product_id], async function (err, result) {
          var product_title = result[0].title;
          var product_path = result[0].path;
          var product_summary = result[0].summary;
          var product_price = result[0].price;
          var details = {
            product_title: product_title,
            product_path: product_path,
            product_summary: product_summary,
            quantity: value.quantity,
            price: value.quantity * product_price,
            status: value.is_pending,
            date: value.date,
            order_id: value.id,
          };
          product_details.push(details);
        });
      }
    }
  });
  setTimeout(() => {
    console.log(user_details);
    console.log(product_details);
    res.render("admin/orders/admin-orders", {
      user_details: user_details,
      product_details: product_details,
    });
  }, 1000);
}

async function updateStatus(req, res, next) {
  var order_id = req.params.order_id;
  var sql = "SELECT * FROM ORDERS WHERE id=?";
  await db.query(sql, [order_id], async function (err, result) {
    data[0].is_pending = req.body.status_value;
  });
  res.redirect("/manageOrder");
}

module.exports = {
  addOrder: addOrder,
  getOrder: getOrder,
  manageOrder: manageOrder,
  updateStatus: updateStatus,
};
