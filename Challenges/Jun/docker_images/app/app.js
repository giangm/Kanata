const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const loginRouter = require('./src/routes/login')
const homeRouter = require('./src/routes/home')
const resetRouter = require('./src/routes/reset')
const pingRouter = require('./src/routes/ping')

const app = express()
const port = 5108
const host = '0.0.0.0'

let users = require('./users').users

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

app.use('/', loginRouter)
app.use('/home', homeRouter)
app.use('/login', loginRouter)
app.use('/reset', resetRouter)
app.use('/ping', pingRouter)
app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/login');
    });
})

app.listen(port, host, () => console.log(`Listening on port ${port}`))