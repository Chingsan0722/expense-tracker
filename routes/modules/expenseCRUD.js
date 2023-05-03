const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 建立新的消費
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const { amountType, name, categoryId, amount, date } = req.body
  let category_id = ''
  const userId = req.user._id
  Category.findOne({ id: categoryId })
    .then(categories => {
      category_id = categories._id
      return Record.create({ amountType, name, category_id, categoryId, amount, date, userId })
        .catch(err => console.log(err))
    })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// 搜尋消費
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()
  let totalAmount = 0
  // const userId = req.user._id
  if (!keywords) {
    return res.redirect('/')
  }
  Category.find()
    .then(Record
      .find({ userId })
      .populate('category_id')
      .lean()
      .then(expenseData => {
        const filterExpense = expenseData.filter(data => data.name.trim().toLowerCase().includes(keyword))
        filterExpense.forEach((data) => {
          return data.date = data.date.toISOString().slice(0, 10)
        })
        expenseData.forEach((data) => {
          if (data.amountType === 'expense') {
            totalAmount -= data.amount
          } else {
            totalAmount += data.amount
          }
        })
        res.render('index', { expenseData: filterExpense, keywords, totalAmount })
      })
    )
    .catch(err => console.log(err))
})

// 修改消費
router.get('/:expenseId/edit', (req, res) => {
  // const userId = req.user._id
  const expenseId = req.params.expenseId
  Category.find()
    .then(
      Record.findById(expenseId)
        .populate('category_id')
        .lean()
        .then(expenseData => {
          expenseData.date = expenseData.date.toISOString().slice(0, 10)
          res.render('edit', { expenseData })
        }
        ))
    .catch(err => console.log(err))
})

router.put('/:expenseId/edit', (req, res) => {
  const expenseId = req.params.expenseId
  const { amountType, name, categoryId, amount, date } = req.body
  let category_id = ''
  const userId = req.user._id
  Category.findOne({ id: categoryId })
    .then(categories => {
      category_id = categories._id
      return Record
        .findByIdAndUpdate(expenseId, { amountType, name, category_id, categoryId, amount, date, userId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
    )
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
