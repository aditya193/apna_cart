const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.get("/orders", ordersController.getOrders);

router.post("/orders", ordersController.addOrder);

module.exports = router;
