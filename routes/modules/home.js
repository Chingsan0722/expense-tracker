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
      .sort({ date: 'asc' })
      .lean()
    const categories = await Category.find().lean()
    records.forEach((data) => {
      if (data.amountType === '支出') {
        totalAmount -= data.amount
      } else {
        totalAmount += data.amount
      }
      data.date = data.date.toISOString().slice(0, 10)
    })
    res.render('index', { records, categories, totalAmount })
  } catch (err) {
    console.log(err)
  }
})

router.post('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryId = req.body.filter
    let totalAmount = 0
    if (categoryId === '0') {
      res.redirect('/')
    } else {
      const records = await Record.find({ categoryId, userId })
        .populate('category_id')
        .lean()
      const categories = await Category.find().lean()
      const filters = await Category.findOne({ id: categoryId }).sort({ id: 'asc' }).lean()
      records.forEach((data) => {
        if (data.amountType === '支出') {
          totalAmount -= data.amount
        } else {
          totalAmount += data.amount
        }
        data.date = data.date.toISOString().slice(0, 10)
      })
      res.render('index', { records, totalAmount, categories, filters })
    }
  } catch (err) {
    console.log(err)
  }
})
module.exports = router