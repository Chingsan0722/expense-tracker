const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

// 建立新的消費
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const { amountType, name, date, category, amount } = req.body
  const expenseData = req.body
  if (!amountType || !name || !date || !category || !amount){
    return res.redirect('/expense/new')
  }
  return Expense.create(expenseData)
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// 修改消費
router.get('/:expenseId/edit', (req, res) => {
  const expenseId = req.params.id
  Expense.findOne(expenseId)
    .lean()
    .then(expenseData => res.render('edit', {
      expenseData
    }))
    .catch(err => console.log(err))
})

router.put('/:expenseId/edit', (req, res) => {
  // 這時候的req.params跟get時的不一樣，應改為expenseId
  const expenseId = req.params.expenseId
  const { amountType, name, date, category, amount } = req.body
  const newExpense = req.body
  if (!amountType || !name || !date || !category || !amount) {
    
    return res.redirect(`/expense/${expenseId}/edit`)
  }
  Expense
    .findByIdAndUpdate(expenseId, {...newExpense})
    .then(() => res.redirect(`/expense/${expenseId}/edit`))
    .catch(err => console.log(err))
})

// 刪除消費
router.delete('/:expenseId', (req, res) => {
  const expenseId = req.params.id
  return Expense.findOne({expenseId})
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
module.exports = router