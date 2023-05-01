const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const expenseData = req.body
  return Expense.create(expenseData)
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router