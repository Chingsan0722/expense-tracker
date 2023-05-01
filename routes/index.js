const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const newCost = require('./modules/new')
router.use('/new', newCost)
router.use('/users', users)
router.use('/', home)
module.exports = router