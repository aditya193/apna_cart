const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.get("/order", ordersController.getOrder);

router.post("/order", ordersController.addOrder);

module.exports = router;
