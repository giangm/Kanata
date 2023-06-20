const express = require('express')
const fs = require('fs')
const detailsRouter = express.Router()

detailsRouter.get('', async(req, res) => {
    fs.readFile('news.json','utf8', function(err, data) {
        if (err) {
            console.error(`Error reading file from disk: ${err}`);
            res.status(500).send('Server Error');
        }

        let newsData = JSON.parse(data);        
    })
    var template = 'Hello ' + req.query.username;
    var html = ejs.render(template);
    res.send(html);
})



module.exports = createRouter