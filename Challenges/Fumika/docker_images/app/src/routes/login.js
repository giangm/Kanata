const express = require('express')
const loginRouter = express.Router()
const passport = require('passport')

loginRouter.post('', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

loginRouter.get('', async(req, res) => {
    res.render('login')   
})



module.exports = loginRouter