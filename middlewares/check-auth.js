function checkAuthStatus(req, res, next) {
    const emailAddress = req.session.emailAddress;

    if (!emailAddress) {
        return next();
    }

    res.locals.emailAddress = emailAddress;
    res.locals.isAuth = req.session.isAuth;
    res.locals.isAdmin = req.session.isAdmin;
    next();
}

module.exports = checkAuthStatus;