const express = require('express');

const adminController = require('../controllers/admin.controller');

const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/admin/login', adminController.getLogin);

router.post('/admin/login', adminController.login);

router.post('/logout', adminController.logout);

router.get('/admin/products', adminController.getProduct);

router.get('/admin/products/new', adminController.getNewProduct);

router.post('/admin/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/admin/products/:id', adminController.getUpdateProduct);

router.post('/admin/products/:id', imageUploadMiddleware, adminController.updateProduct);

router.get('/admin/products/delete/:id', adminController.deleteProduct)

module.exports = router;