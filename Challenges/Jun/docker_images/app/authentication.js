function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
  
    return res.redirect('/login')
}

function notAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/home')
    }

    return next()
}

function checkAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type != 'user') {
        return next()
    }
    
    return res.redirect('/home')
}

module.exports = {
    checkAuthenticated: checkAuthenticated,
    notAuthenticated: notAuthenticated,
    checkAdmin: checkAdmin
}