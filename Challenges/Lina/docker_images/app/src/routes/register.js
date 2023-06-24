const express = require('express')
const bcrypt = require('bcrypt')
const registerRouter = express.Router()

let users = [
    {
        id: '0',
        name: 'admin',
        username: 'admin',
        password: '$2b$10$jYJS7YuuOSsMVfes.I/V/eAieDdEZNK9.H3MjJ6MlMgv4YakzjS/2',
        email: 'admin@lina.com',
        bio: '',
        plan: 'basic',
        language: 'english',
        type: 'admin',
        views: 0,
        creation: '2023-06-09'
    }
]

registerRouter.post('', async(req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.username,
            username: req.body.username,
            password: hash,
            email: `${req.body.username}@lina.com`,
            bio: '',
            plan: 'basic',
            language: 'english',
            type: 'normal',
            views: 0,
            creation: new Date().toISOString().slice(0,10)
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
    users: users,
    setViews: (id) => {
        const user = users.find(user => user.id === id);
        if (user && user.views < 2) {
          user.views++;
          return true;
        }
        return false;
    },
    update: (id, data) => {
        const user = users.find(user => user.id === id);
        Object.assign(user, data);
        console.log(users)
    },
    getPassword: (id) => {
        const user = users.find(user => user.id === id)
        return user.password
    },
    isPremium: (id) => {
        const user = users.find(user => user.id === id);
        return user.plan === 'premium'
    }
}