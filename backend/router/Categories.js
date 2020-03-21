const express = require('express');

const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories =  await Category.find();
        return res.send(categories);
    } catch {
        return res.status(404).send({error: 'Not found!!!'});
    }
});

module.exports = router;
