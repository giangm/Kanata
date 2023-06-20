const express = require('express')
const fs = require('fs')
const authRequired = require('../../authentication')
const createRouter = express.Router()

createRouter.post('', authRequired.checkAuthenticated, async(req, res) => {
    const tags = req.body.tags == undefined ? [] : req.body.tags.split(',');
    const entry = {
        id: Date.now().toString(),
        title: req.body.title,
        date: new Date().toISOString().slice(0,10),
        description: req.body.description,
        author: req.user.username,
        tags: tags,
        source: req.body.source
    }
    fs.readFile('news.json','utf8', function(err, data) {
        if (err) {
            console.error(`Error reading file from disk: ${err}`);
            res.status(500).send('Server Error');
        }

        let newsData = JSON.parse(data);
        newsData.news.push(entry);

        fs.writeFile('news.json', JSON.stringify(newsData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file to disk: ${err}`);
                return res.sendStatus(500);
            }

            console.log('Successfully added new entry to the JSON file.');
            res.redirect('/news')
        });
    })
})

createRouter.get('', authRequired.checkAuthenticated, async(req, res) => {
    res.render('create')   
})



module.exports = createRouter