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

module.exports = {
    checkAuthenticated: checkAuthenticated,
    notAuthenticated: notAuthenticated,
}