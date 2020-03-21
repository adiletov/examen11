const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');


router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);

        user.generateToken();
        await user.save();

        return res.send({message: 'User registered!', user});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(401).send({message: 'Username or Password incorrect!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch){
        return res.status(401).send({message: 'Username or Password incorrect!'});
    }

    try {
        user.generateToken();
        await user.save();
        return res.send({message: 'Login successful!!!', user});
    } catch (e) {
        res.status(404).send({error: 'Noy found'})
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Bye'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);


    user.generateToken();
    await user.save();
    return res.send(success);

});

module.exports = router;
