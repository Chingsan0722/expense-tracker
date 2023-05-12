const categories = [
  {
    id: 1,
    category: '家居物業',
    icon: 'fa-house'
  },
  {
    id: 2,
    category: '交通出行',
    icon: 'fa-van-shuttle'
  },
  {
    id: 3,
    category: '休閒娛樂',
    icon: 'fa-face-grin-beam'
  },
  {
    id: 4,
    category: '餐飲食品',
    icon: 'fa-utensils'
  },
  {
    id: 5,
    category: '其他',
    icon: 'fa-pen'
  },
  {
    id: 6,
    category: '薪資收入',
    icon: 'fa-sack-dollar'
  },
  {
    id: 7,
    category: '額外收入',
    icon: 'fa-face-surprise'
  },
  {
    id: 8,
    category: '投資收入',
    icon: 'fa-arrow-trend-up'
  }]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
db.once('open', () => {
  return Promise.all([
    Category.create(categories)
  ])
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
})
