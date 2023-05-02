const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 9000
  Category.find()
    .then(checkedCategory => {
      Record.find({ userId })
        .populate('categoryId')
        .lean()
        .then((expenseData) => {
          expenseData.forEach((data) => {
            if (data.amountType === 'expense') {
              totalAmount -= data.amount
            } else {
              totalAmount += data.amount
            }
          })
          expenseData.forEach((data) => {
            return data.date = data.date.toISOString().slice(0, 10)
          })
          console.log(expenseData)
          return res.render('index', { expenseData, totalAmount, checkedCategory })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router