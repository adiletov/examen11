const express = require('express');

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    let category = null;

    if (req.query.category) {
        category = {category: req.query.category};
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
            .populate('user', ['fullName', 'phoneNumber'])
            .populate('category', 'title');

        return res.send(product);
    } catch (e) {
        return res.status(401).send(e);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const productData = req.body;
    const user = req.user;

    productData.user = user._id;
    if (req.file) {
        productData.image = req.file.filename;
    }

    try {
        const item = new Product(productData);

        await item.save();
        return res.send({message: 'Product added!!!', item});
    } catch (e) {
        return res.status(404).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id});
        const user = req.user;
        if (product.userId === user._id) {
            await Product.deleteOne({_id: req.params.id});
            return res.status(200).send({message: 'Item deleted!'});
        } else {
            return res.status(403).send({message: 'Access forbidden!'});
        }
    } catch (error) {
        return res.status(404).send(error);
    }
});

module.exports = router;
