const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 建立新的消費
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const { amountType, name, categoryId, amount, date } = req.body
  const userId = req.user._id
  return Record.create({ amountType, name, categoryId, amount, date, userId })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// 搜尋消費
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()
  // const userId = req.user._id
  if (!keywords) {
    return res.redirect('/')
  }
  return Record
    .find({ userId })
    .lean()
    .then(expenseData => {
      const filterExpense = expenseData.filter(data => data.name.trim().toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword))
      res.render('index', { expenseData: filterExpense, keywords })
    })
    .catch(err => console.log(err))
})

// 修改消費
router.get('/:expenseId/edit', (req, res) => {
  const expenseId = req.params.id
  Record.findOne(expenseId)
    .lean()
    .then(expenseData => res.render('edit', {
      expenseData
    }))
    .catch(err => console.log(err))
})

router.put('/:expenseId/edit', (req, res) => {
  // 這時候的req.params跟get時的不一樣，應改為expenseId
  const expenseId = req.params.expenseId
  const newExpense = req.body
  return Record
    .findByIdAndUpdate(expenseId, { ...newExpense })
    .then(() => res.redirect(`/expense/${expenseId}/edit`))
    .catch(err => console.log(err))
})

// 刪除消費
router.delete('/:expenseId', (req, res) => {
  const expenseId = req.params.id
  return Record.findOne({ expenseId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
module.exports = router