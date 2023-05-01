const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const expenseCRUD = require('./modules/expenseCRUD')
router.use('/expense', expenseCRUD)
router.use('/users', users)
router.use('/', home)
module.exports = router