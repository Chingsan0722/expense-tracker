const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  try {
    const records = await Record.find({ userId })
      .populate('category_id')
      .lean()
    records.forEach((data) => {
      if (data.amountType === '支出') {
        totalAmount -= data.amount
      } else {
        totalAmount += data.amount
      }
      data.date = data.date.toISOString().slice(0, 10)
    })
    res.render('index', { records, totalAmount })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:type', async (req, res) => {
  const userId = req.user._id
  const { type } = req.params
  let totalAmount = 0
  try {
    const records = await Record.find({ userId })
      .populate('category_id')
      .lean()
    const filterExpense = records.filter(data => data.category_id.category.includes(type))
    filterExpense.forEach((data) => {
      if (data.amountType === '支出') {
        totalAmount -= data.amount
      } else {
        totalAmount += data.amount
      }
      data.date = data.date.toISOString().slice(0, 10)
    })
    res.render('index', { records: filterExpense, totalAmount, type })
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
