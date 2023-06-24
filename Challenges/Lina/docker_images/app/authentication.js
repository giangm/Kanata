function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
  
    res.redirect('/login')
}

function notAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }

    next()
}

module.exports = {
    checkAuthenticated: checkAuthenticated,
    notAuthenticated: notAuthenticated
}