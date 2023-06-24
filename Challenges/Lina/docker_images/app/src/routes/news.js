const express = require('express')
const fs = require('fs');
const authRequired = require('../../authentication')
const setViews = require('./register').setViews
const isPremium = require('./register').isPremium

const newsRouter = express.Router()

newsRouter.get('', authRequired.checkAuthenticated, async(req, res) => {
    fs.readFile('news.json', 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file from disk: ${err}`);
        return res.status(500).send('Server Error');
      } else {
        const jsonData = JSON.parse(data);
        if (req.query.id == undefined) {
            let newJson = []
            for (const j of jsonData.news) {
                const i = {
                    id: j.id,
                    title: j.title,
                    date: j.date,
                    author: j.author
                }
                newJson.push(i)
            }
            return res.render('news', { articles: newJson, error: null })
        } else {
            let articles = jsonData.news.filter(item => item.id === req.query.id);
            if (articles == undefined) {
              return res.render('news', { articles: [], error: null })
            } else if (isPremium(req.user.id)) {
              return res.render('news', { articles: articles, error: null })
            } 
            
            if (setViews(req.user.id) === false) {
              return res.render('news', { articles: [], error: 'The current account subscription can only view 3 articles. A premium plan is required for more access.' })              
            }

            return res.render('news', { articles: articles, error: null })
        }
      }
    });    
})

module.exports = newsRouter