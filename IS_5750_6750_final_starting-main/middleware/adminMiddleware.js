module.exports = (req, res, next) => {
    if (req.session.isAuthenticated && req.session.user && req.session.user.admin) {
      next();
    } else {
      res.render('unauthorized', {
        pageTitle: 'Unauthorized',
        path: req.path, 
        loggedIn: req.session.isAuthenticated,
        user: req.session.user || {}
      });
    }
  };