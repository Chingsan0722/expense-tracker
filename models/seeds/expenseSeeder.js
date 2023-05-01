if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record') // 載入Todo model
const User = require('../user') // 載入User model
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
