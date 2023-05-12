const express = require('express')
const router = express.Router()
require('../middleware/auth')
const home = require('./modules/home')
const users = require('./modules/users')
const expense = require('./modules/expense')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/expense', authenticator, expense)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
