const express = require('express');

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    let category = null;

    if (req.query.category) {
        category = {categoryId: req.query.category};
    }

    try {
        const products = await Product
            .find(category)
            .sort({datetime: -1})
            .select(['title', 'image', 'price']);

        return res.send(products);
    } catch (e) {
        return res.status(401).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product
            .findOne({_id: req.params.id})
            .populate('userId', ['fullName', 'phoneNumber'])
            .populate('categoryId', 'title');

        return res.send(product);
    } catch (e) {
        return res.status(401).send(e);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const productData = req.body;
    const user = req.user;
    productData.userId = user._id;
    productData.datetime = new Date();

    if (req.file) {
        productData.image = req.file.filename;
    }
    const product = new Product(productData);
    try {
        await product.save();
        return res.send({message: 'Product added!!!', product});
    } catch (e) {
        return res.status(404).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findOne({_id : req.params.id});
        const user = req.user;
        if (product.userId.equals(user._id)) {
            await product.remove();
            return res.status(200).send({message: 'Продукт удален!'});
        } else {
            return res.status(401).send({message: 'Доступ запрещен!'});
        }
    } catch (error) {
        return res.status(404).send(error);
    }

});

module.exports = router;
