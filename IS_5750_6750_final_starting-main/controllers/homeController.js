exports.getHome = (req, res, { loggedIn, user }) => {
  res.render('index', {
    pageTitle: 'Home',
    path: '/', 
    loggedIn,
    user: user || {}, 
  });
};

exports.getAbout = (req, res, { loggedIn, user }) => {
  res.render('about', {
    pageTitle: 'About',
    path: '/about', 
    loggedIn,
    user: user || {}, 
  });
};