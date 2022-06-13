const mysql = require("mysql");
const db = require("../data/database");

function formatDate(date) {
    var formattedDate = date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return formattedDate;
}

async function addOrder(req, res, next) {
    const cart = res.locals.cart;
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

    req.session.cart = null;
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
                await db.query(
                    sql1,
                    [product_id],
                    async function (err, result) {
                        var formattedDate = formatDate(value.date);
                        var order = {
                            title: result[0].title,
                            path: result[0].path,
                            summary: result[0].summary,
                            quantity: value.quantity,
                            price: value.quantity * result[0].price,
                            status: value.is_pending,
                            date: formattedDate,
                        };
                        // console.log(order);
                        orders.push(order);
                    }
                );
            }
        }
    });
    setTimeout(() => {
        // console.log(orders);
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
                    var user_email = result[0].email;
                    var user_address = result[0].address;
                    var user_pincode = result[0].pincode;
                    var user_city = result[0].city;
                    var user_state = result[0].state;
                    var detail = {
                        user_name: user_name,
                        user_contact: user_contact,
                        user_email: user_email,
                        user_address: user_address,
                        user_pincode: user_pincode,
                        user_city: user_city,
                        user_state: user_state,
                    };
                    user_details.push(detail);
                });
                var formattedDate = formatDate(value.date);
                var product_id = value.product_id;
                var sql2 = "SELECT * FROM PRODUCTS WHERE id=?";
                await db.query(
                    sql2,
                    [product_id],
                    async function (err, result) {
                        var product_title = result[0].title;
                        var product_path = result[0].path;
                        var product_summary = result[0].summary;
                        var product_price = result[0].price;
                        var details = {
                            product_title: product_title,
                            product_path: product_path,
                            product_summary: product_summary,
                            quantity: value.quantity,
                            price: product_price,
                            status: value.is_pending,
                            date: formattedDate,
                            order_id: value.id,
                        };
                        product_details.push(details);
                    }
                );
            }
        }
    });
    setTimeout(() => {
        // console.log(user_details);
        // console.log(product_details);
        res.render("admin/orders/admin-orders", {
            user_details: user_details,
            product_details: product_details,
        });
    }, 1000);
}

async function updateStatus(req, res, next) {
    var order_id = req.params.order_id;
    var sql = "SELECT * FROM ORDERS WHERE id=?";
    await db.query(sql, [order_id], async function (err, data) {
        var value;
        if (req.body.status_value === "1") value = 1;
        else {
            value = 0;
        }
        var sql1 = "UPDATE ORDERS SET is_pending=? WHERE id=?";
        await db.query(sql1, [value, order_id], async function (err, data) {
            if (err) throw err;
        });
    });

    res.redirect("/manageOrder");
}

module.exports = {
    addOrder: addOrder,
    getOrder: getOrder,
    manageOrder: manageOrder,
    updateStatus: updateStatus,
};
