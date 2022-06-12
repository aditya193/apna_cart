const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.get("/orders", ordersController.getOrder);

router.post("/orders", ordersController.addOrder);

router.get("/manageOrder", ordersController.manageOrder);

router.get("/updateStatus/:order_id", ordersController.updateStatus);

module.exports = router;
