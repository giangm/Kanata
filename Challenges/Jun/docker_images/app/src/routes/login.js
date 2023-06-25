const express = require('express')
const loginRouter = express.Router()
const authRequired = require('../../authentication')
const passport = require('passport')

loginRouter.post('', authRequired.notAuthenticated, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

loginRouter.get('', authRequired.notAuthenticated, async(req, res) => {
    return res.render('login')   
})


module.exports = loginRouter