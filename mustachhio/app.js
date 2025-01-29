require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

// Import npm libraries
const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");

// Import routes
const homeRoutes = require("./routes/homeRoutes");
const stylesRoutes = require("./routes/stylesRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const middleware = require("./middleware");
const apiRoutes = require("./routes/apiRoutes");
const externalApiRoutes = require('./routes/externalApiRoutes');

const app = express();

// Connect to MongoDB
const mongoDBURI = process.env.MONGODB_ADDON_URI;
const mongoDBName = process.env.MONGODB_ADDON_DB;

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: mongoDBName
});

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, "public")));

// Load middleware to parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

// Configure session middleware
app.use(
  session({
    secret: "mustacchi",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoDBURI })
  })
);

// Use express-fileupload middleware
app.use(fileUpload());

// Set the templating engine using app.set
app.set("view engine", "ejs");

// Tell the application where to find the views
app.set("views", "views");
app.use(expressLayouts);
app.use(middleware);
app.use("/styles", stylesRoutes);
app.use("/blog", blogRoutes);
app.use('/contacts', contactRoutes);
app.use(homeRoutes);
app.use(userRoutes);
app.use(apiRoutes);
app.use(externalApiRoutes);

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    res.locals.loggedIn = req.session.isAuthenticated;
  } else {
    res.locals.user = null;
    res.locals.loggedIn = false;
  }
  next();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});