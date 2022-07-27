var express = require('express')
var bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 6
var router = express.Router()
const User = require('../models/User')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
  const user = await User.create({firstName: req.body.firstName, lastName: req.body.lastName, emailAddress:req.body.emailAddress, password:hashedPassword})
  const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' })
  res.status(200).json(token); // send it to the frontend
})

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ emailAddress: req.body.emailAddress });
  if (!(bcrypt.compareSync(req.body.password, user.password))) throw new Error();
  const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
  res.status(200).json(token)
})

module.exports = router