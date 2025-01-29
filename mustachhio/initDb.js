const mongoose = require("mongoose");
const MustacheStyle = require("./models/mustacheStyle");
const BlogPost = require("./models/BlogPost");
const ContactRequest = require("./models/ContactRequest");
const mustacheData = require("./util/mustacheData.json");
const blogData = require("./util/blogData.json");

mongoose
  .connect("MONGO_CONNECT")
  .then(() => {
    console.log("Connected to MongoDB");
    return initializeData();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function initializeData() {
  try {
    await MustacheStyle.deleteMany();
    await BlogPost.deleteMany();
    await ContactRequest.deleteMany();

    const mustacheStyles = await MustacheStyle.create(mustacheData);
    console.log("Mustache styles initialized:", mustacheStyles);

    const blogPosts = await BlogPost.create(blogData);
    console.log("Blog posts initialized:", blogPosts);

    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error initializing data:", error);
    mongoose.disconnect();
  }
}
