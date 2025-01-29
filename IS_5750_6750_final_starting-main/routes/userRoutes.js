const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const adminMiddleware = require('../middleware/adminMiddleware');
const User = require('../models/User');

function ensureAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.redirect("/login");
}

router.post("/register", (req, res) => {
  usersController.registerUser(req, res);
});

router.post("/login", (req, res) => {
  usersController.loginUser(req, res);
});

router.post("/logout", usersController.logoutUser);


router.post("/favorite/:titleSlug", ensureAuthenticated, (req, res, next) => {
  usersController.addFavoriteStyle(req, res, next);
});

router.get("/favorite-styles", ensureAuthenticated, (req, res, next) => {
  usersController.getFavoriteStyles(req, res, next);
});

router.post('/users/admin-privileges', adminMiddleware, (req, res) => {
  usersController.updateAdminPrivileges(req, res);
});

router.get('/users/admin-privileges', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin-privileges', {
      pageTitle: 'Admin Privileges',
      path: '/users/admin-privileges', 
      users,
      loggedIn: req.session.isAuthenticated,
      user: req.session.user || {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users');
  }
});
module.exports = router;