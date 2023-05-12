const express = require('express')
const { engine } = require('express-handlebars')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT || 3000

const routes = require('./routes')
require('./config/mongoose')
const app = express()
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')
//handlebars helper
handlebars.registerHelper('eq', function (a, b) {
  return a === b
})
handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  if (arg1 == null || arg2 == null) {
    return options.inverse(this);
  }
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost${PORT}`)
})
