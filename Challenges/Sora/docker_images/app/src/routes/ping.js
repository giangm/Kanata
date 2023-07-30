const express = require('express')
const { exec } = require('child_process');
const pingRouter = express.Router()
const authRequired = require('../../authentication')
const passport = require('passport')

pingRouter.post('', authRequired.checkAuthenticated, async(req, res) => {
    let ip = req.body.ip.replace(/([&|`\s]|id|whoami)+/g, '');
    exec(`ping -c5 -w2 ${ip}`, (error, stdout, stderr) => {
        const lines = stdout.split("\n");
        const response = {
            ip: ip,
            stdout: lines
        }

        return res.render('ping', { result: response })
    });
})

pingRouter.get('', authRequired.checkAuthenticated, async(req, res) => {
    return res.render('ping', { result: null })   
})


module.exports = pingRouter
