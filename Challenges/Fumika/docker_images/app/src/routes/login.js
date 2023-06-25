const express = require('express')
const authRequired = require('../../authentication')
const loginRouter = express.Router()
const passport = require('passport')

loginRouter.post('', authRequired.notAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

loginRouter.get('', authRequired.notAuthenticated, async(req, res) => {
    res.render('login')   
})



module.exports = loginRouter
