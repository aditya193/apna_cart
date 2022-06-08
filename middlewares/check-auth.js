function checkAuthStatus(req, res, next) {
  const emailAddress = req.session.emailAddress;

  if (!emailAddress) {
    return next();
  }

  res.locals.emailAddress = emailAddress;
  res.locals.isAuth = req.session.isAuth;
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.user_id = req.session.user_id;
  next();
}

module.exports = checkAuthStatus;
