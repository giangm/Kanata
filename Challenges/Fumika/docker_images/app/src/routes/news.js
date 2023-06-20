const express = require('express')
const fs = require('fs');
const ejs = require('ejs');
const authRequired = require('../../authentication')
const beautify = require('js-beautify').html;

const newsRouter = express.Router()

newsRouter.get('', authRequired.checkAuthenticated, async(req, res) => {
    fs.readFile('news.json', 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file from disk: ${err}`);
        res.status(500).send('Server Error');
      } else {
        const jsonData = JSON.parse(data);
        if (req.query.author == undefined) {
          res.render('news', { articles: jsonData.news })
        } else {
          fs.readFile('src/views/partials/header.ejs', 'utf8', (err, tmpl) => {
            let news = jsonData.news.filter(item => item.author === req.query.author);
            if (news == undefined) {
              res.render('news', { articles: [] })
            }
            news.forEach(item => {
              tmpl += `
                <div>
                  <h2>${item.title}</h2>
                  <p>${item.tags}</p>
                  <p>${item.date}</p>
                  <p>${item.author}</p>
                  <p>${item.description}</p>
                  <p>${item.source}</p>
                </div>`
            });
            tmpl += `
                </section>
              </body>
              </html>`
            const prettyTmpl = beautify(tmpl, { indent_size: 2 });
            const tCompiled = ejs.compile(prettyTmpl);
            const rendered = tCompiled({
              require: require,
            })
            res.send(rendered)
          })
        }
      }
    });    
})

module.exports = newsRouter