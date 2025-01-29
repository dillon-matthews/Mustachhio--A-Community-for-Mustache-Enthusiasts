const bcrypt = require("bcrypt");
const User = require("../models/User");
const MustacheStyle = require("../models/mustacheStyle");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", {
        pageTitle: "Login",
        path: "/login", 
        errorMessage: "Invalid email or password",
        loggedIn: req.session.isAuthenticated,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        pageTitle: "Login",
        path: "/login", 
        errorMessage: "Invalid email or password",
        loggedIn: req.session.isAuthenticated,
      });
    }
    req.session.userId = user._id;
    req.session.user = user; 
    req.session.isAuthenticated = true;
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
      if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Logout failed");
      }
      res.redirect("/");
  });
};


exports.addFavoriteStyle = async (req, res, next) => {
  try {
    const titleSlug = req.params.titleSlug;
    console.log('Title Slug:', titleSlug);

    const userId = req.session.userId;
    console.log('User ID:', userId);

    if (!req.session.isAuthenticated) {
      console.log('User not authenticated');
      return res.redirect("/login");
    }

    const style = await MustacheStyle.findOne({ titleSlug: titleSlug });
    if (!style) {
      console.log('Style not found');
      return res.status(404).send("Style not found");
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { favoriteStyles: style._id },
    });
    console.log('Favorite style added successfully');

    res.redirect(`/styles/${style.titleSlug}`);
  } catch (error) {
    console.error('Error adding favorite style:', error);
    next(error);
  }
};

exports.getFavoriteStyles = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!req.session.isAuthenticated) {
      return res.redirect("/login");
    }

    const user = await User.findById(userId).populate("favoriteStyles");
    res.render("favorite-styles", {
      pageTitle: "Favorite Styles",
      styles: user.favoriteStyles,
      loggedIn: req.session.isAuthenticated,
      user: user,
      path: "/favorite-styles",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAdminPrivileges = async (req, res) => {
  try {
    const usersUpdates = req.body.users;

    for (const update of usersUpdates) {
      await User.findByIdAndUpdate(update.id, { admin: update.admin === 'on' });
    }

    res.redirect('/users/admin-privileges');
  } catch (error) {
    console.error('Failed to update user privileges:', error);
    res.status(500).send('Error updating admin privileges');
  }
};