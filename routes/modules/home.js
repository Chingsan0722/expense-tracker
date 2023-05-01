const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

router.get('/', (req, res) => {
  Expense.find()
  .lean()
  .then(expenseData => res.render('index',{expenseData}))
  .catch(err => console.log(err))
})

module.exports = router