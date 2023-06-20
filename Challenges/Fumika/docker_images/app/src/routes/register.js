const express = require('express')
const bcrypt = require('bcrypt')
const registerRouter = express.Router()

const users = [
    {
        id: '0',
        username: 'admin',
        password: '$2b$10$jYJS7YuuOSsMVfes.I/V/eAieDdEZNK9.H3MjJ6MlMgv4YakzjS/2'
    }
]

registerRouter.post('', async(req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hash
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

registerRouter.get('', async(req, res) => {
    res.render('register')   
})


module.exports = {
    router: registerRouter,
    users: users
}