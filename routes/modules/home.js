const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  Category.find()
    .then(
      Record.find({ userId })
        .populate('category_id')
        .lean()
        .then((expenseData) => {
          expenseData.forEach((data) => {
            if (data.amountType === '支出') {
              totalAmount -= data.amount
            } else {
              totalAmount += data.amount
            }
          })
          expenseData.forEach((data) => {
            data.date = data.date.toISOString().slice(0, 10)
          })
          return res.render('index', { expenseData, totalAmount })
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
})

router.get('/:type', (req, res) => {
  const userId = req.user._id
  const { type } = req.params
  let totalAmount = 0
  if (type === '全部') return res.redirect('/')
  Category.find()
    .then(
      Record.find({ userId })
        .populate('category_id')
        .lean()
        .then((expenseData) => {
          const filterExpense = expenseData.filter(data => data.category_id.category.includes(type))
          filterExpense.forEach((data) => {
            if (data.amountType === '支出') {
              totalAmount -= data.amount
            } else {
              totalAmount += data.amount
            }
          })
          filterExpense.forEach((data) => {
            data.date = data.date.toISOString().slice(0, 10)
          })
          return res.render('index', { expenseData: filterExpense, totalAmount, type })
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
})
module.exports = router
