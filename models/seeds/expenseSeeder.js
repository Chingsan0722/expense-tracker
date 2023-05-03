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
  Promise.all(
    SEED_USER.map((user, index) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash =>
          User.create({
            name: user.name,
            email: user.email,
            password: hash
          }))
        .then((user) => {
          const userId = user._id
          return Category.find()
            .then(categories => {
              const categoriesId = []
              categories.forEach(category => {
                categoriesId.push(category._id)
                categoriesId.push(category.id)
              })
              return categoriesId
            })
            .then(id => {
              return Promise.all([
                Record.create({
                  amountType: 'expense',
                  name: 'exp01',
                  date: '2023-05-02',
                  amount: 100,
                  category_id: id[0],
                  userId,
                  categoryId: id[1]
                })
                  .catch(err => console.log(err))
              ])
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
})
