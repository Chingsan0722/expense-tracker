const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema ({
  amountType: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required: true 
  },
  category: {
    type: String,
    required: true
  },
// 用string儲存就可以避免掉資料回傳到前端時過多資訊問題
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Expense', expenseSchema)