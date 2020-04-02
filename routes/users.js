const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const userModel = require('../model/user');

// @route POST localhost:3040/users/signup
// @desc user register
// @access Public
router.post('/signup', (req, res) => {
    userModel
        .findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.json({
                    email: '이메일이 이미 존재합니다'
                });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                const newUser = new userModel({
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    avatar: avatar
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => res.json(err));
                    });
                });
            }
        })
        .catch(err => res.json(err));
});

module.exports = router;

