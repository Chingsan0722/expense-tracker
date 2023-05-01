const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const now = '2023-11-29T08:00:00.000+08:00'
function localTime(date) {
  return moment(date).format('YYYY-MM-DD')
}


const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

router.get('/', (req, res) => {
  Record.find()
    .lean()
    // .then(expenseData => {
    //   return Promise.all(
    //     Array.from(
    //       expenseData.length, (expenseData) => {
    //         const newDate = localTime(expenseData.date)
    //         expenseData.date = newDate
    //       }))
    //     .then(() => console.log(expenseData))
    // })
    .then((expenseData) => res.render('index',{expenseData}))
    .catch(err => console.log(err))
})

module.exports = router