const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const newsRouter = require('./src/routes/news')
const loginRouter = require('./src/routes/login')
const registerRouter = require('./src/routes/register')
const createRouter = require('./src/routes/create')

const app = express()
const port = 5105
const host = '0.0.0.0'

const users = registerRouter.users

const initPassport = require('./passport-config')
initPassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

app.use(flash())
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/', newsRouter)
app.use('/news', newsRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter.router)
app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})
app.use('/create', createRouter)

app.listen(port, host, () => console.log(`Listening on port ${port}`))