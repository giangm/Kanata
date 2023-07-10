const express = require('express')
const homeRouter = express.Router()
const authRequired = require('../../authentication')
const passport = require('passport')

homeRouter.get('', authRequired.checkAuthenticated, async(req, res) => {
    return res.render('home')   
})


module.exports = homeRouter