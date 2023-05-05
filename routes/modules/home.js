const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

const CATEGORY = {
  家居物業: 'https://fontawesome.com/icons/home?style=solid',
  交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid'
}

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const directType = '全部'
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
            return data.date = data.date.toISOString().slice(0, 10)
          })
          return res.render('index', { expenseData, totalAmount, directType })
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
})

router.get('/:type', (req, res) => {
  const userId = req.user._id
  const { type } = req.params
  let totalAmount = 0
  if (!type) return res.redirect('/')
    Category.find()
      .then(
        Record.find({ categoryId: type, userId })
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
              return data.date = data.date.toISOString().slice(0, 10)
            })
            if (expenseData[0] === undefined) {
              req.flash('warning_msg', '該類別沒有帳目！')
              return res.redirect('/')
            }
            return res.render('index', { expenseData, totalAmount, directType: expenseData[0].category_id.category })
          })
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err))
})
module.exports = router
