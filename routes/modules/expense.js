const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')

// 建立新的消費
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ id: 'asc' })
    .then((categories) => {
      res.render('new', { categories })
    })
})
router.post('/new', async (req, res) => {
  const { amountType, name, categoryId, amount, date } = req.body
  let category_id = ''
  const userId = req.user._id
  try {
    const categories = await Category.findOne({ id: categoryId })
    category_id = categories._id
    await Record.create({ amountType, name, category_id, categoryId, amount, date, userId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
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
  Record.find({ userId })
    .populate('category_id')
    .lean()
    .then(records => {
      const filterExpense = records.filter(data => data.name.trim().toLowerCase().includes(keyword))
      if (filterExpense.length === 0) {
        res.render('index', { keywords, totalAmount })
      } else {
        filterExpense.forEach((data) => {
          data.date = data.date.toISOString().slice(0, 10)
        })
        records.forEach((data) => {
          if (data.amountType === '支出') {
            totalAmount -= data.amount
          } else {
            totalAmount += data.amount
          }
        })
        res.render('index', { records: filterExpense, keywords, totalAmount })
      }
    })
    .catch(err => console.log(err))
})

// 修改消費
router.get('/:expenseId/edit', async (req, res) => {
  try {
    const expenseId = req.params.expenseId
    const categories = await Category.find().sort({ id: 'asc' }).lean()
    const records = await Record.findById(expenseId).populate('category_id').lean()
    records.date = records.date.toISOString().slice(0, 10)
    res.render('edit', { records, categories})
  } catch (err) {
    console.log(err)
  }
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
  const expenseId = req.params.expenseId
  return Record.findOne({ _id: expenseId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.log(err)
      return res.redirect('/')
    })
})
module.exports = router
