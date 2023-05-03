const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  amountType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Expense', expenseSchema)
