const express = require('express')
const bcrypt = require('bcrypt')
const authRequired = require('../../authentication')
const users = require('../../users')

const resetRouter = express.Router()

resetRouter.get('', authRequired.checkAuthenticated, async(req, res) => {
    return res.render('reset', { user: req.user })
})

resetRouter.post('', authRequired.checkAuthenticated, async(req, res) => {
    const jsonData = req.body
    const hash = await bcrypt.hash(req.body.password, 10)
    jsonData.id = req.user.id
    jsonData.username = req.user.username
    jsonData.password = hash
    users.update(jsonData.id, jsonData)
    return res.redirect('/reset')
})

module.exports = resetRouter