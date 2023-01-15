const express = require('express');
const jwt = require('jsonwebtoken')

const dotenv = require("dotenv");
dotenv.config()

const User = require('../models/user')
const Event = require('../models/event')
const Special = require('../models/special')

const router = express.Router()


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    console.log(req.headers.authorization);
    let token = req.headers.authorization.split(' ')[1]
    console.log(token);
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try {
        let payload = jwt.verify(token, process.env.jwtSecretKey)
        console.log(`payload : ${payload.subject}`)
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }
        req.userId = payload.subject
        next()
    } catch (err) {
        return res.status(401).send('Unauthorized request')
    }
}

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', async (req, res) => {
    userData = req.body;
    console.log(userData)
    try {
        const userCheck = await User.findOne({ email: userData.email })
        console.log(userCheck)
        if (userCheck) {
            return res.status(401).send('Email already exists')
        } else {
            const user = new User(userData);
            user.save()
                .then((registeredUser) => {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, process.env.jwtSecretKey)
                    console.log(token)
                    res.status(200).send({ token })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    userData = req.body;
    try {
        const user = await User.findOne({ email: userData.email })
        if (!user) {
            res.status(401).send('Invalid email')
        } else if (user.password !== userData.password) {
            res.status(401).send('Invalid password')
        } else {
            let payload = { subject: user._id }
            let token = jwt.sign(payload, process.env.jwtSecretKey)
            res.status(200).send({ token })
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find({})
        res.json(events)
    } catch (err) {
        console.log(err)
    }
})

router.get('/special', verifyToken, async (req, res) => {
    try {
        const events = await Special.find({})
        res.json(events)
    } catch (err) {
        console.log(err)
    }
})

router.get('/profile', async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1]
        let payload = jwt.verify(token, process.env.jwtSecretKey)
        let user = await User.findOne({_id:payload.subject})
        console.log(user);
        user = user.toJSON();
        // let image =`/images/image${payload.subject}.jpg`
        user.imagePath=`/images/image${payload.subject}.jpg`
        console.log(user);
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})

router.post('/imageUpload', async (req, res) => {
    let image = req['files'].image;
    // console.log("File uploaded: ", image.name);
    // console.log("body uploaded: ", req.headers.authorization);
    let token = req.headers.authorization.split(' ')[1]
    // console.log("token uploaded: ",token);
    let payload = jwt.verify(token, process.env.jwtSecretKey)
    // console.log(`payload : ${payload.subject}`)
    image.mv('./public/images/' + "image" + payload.subject + ".jpg");
})

module.exports = router