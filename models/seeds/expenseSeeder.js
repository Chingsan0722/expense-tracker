if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record') // 載入Todo model
const User = require('../user') // 載入User model
const Category = require('../category')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '1234'
  },
  {
    name: 'user2',
    email: 'user2@example.con',
    password: '1234'
  }
]

db.once('open', () => {
  Category.find()
    .then(categories => {
      const categoriesId = []
      categories.forEach(category => {
        categoriesId.push(category._id)
      })
      return categoriesId
    })
    .then(id => {
      Record.create({
        amountType: 'expense',
        name: 'exp01',
        date: '2023-05-02',
        amount: 100,
        categoryId: id[0],
        userId: '6450ae5fa496f11ad4ac15ed'
      })
    })
  return console.log('done.')
})
