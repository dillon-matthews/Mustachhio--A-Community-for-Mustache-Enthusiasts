const mongoose = require("mongoose");
const slugify = require("slugify");

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /\.(jpg|png)$/i.test(value);
      },
      message: "Image must be in JPG or PNG format",
    },
  },
  summary: {
    type: String,
    required: true,
    maxLength: 350,
  },
  content: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  titleSlug: {
    type: String,
    required: true,
  },
});

blogPostSchema.pre("save", function (next) {
  if (!this.titleSlug) {
    this.titleSlug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
