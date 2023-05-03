const express = require('express')
const router = express.Router()
require('../middleware/auth')
const home = require('./modules/home')
const users = require('./modules/users')
const expenseCRUD = require('./modules/expenseCRUD')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/expense', authenticator, expenseCRUD)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
