const mongoose = require("mongoose");
const slugify = require("slugify");

const mustacheStyleSchema = new mongoose.Schema({
  title: { type: String, required: true },
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
  description: { type: String, required: true },
  titleSlug: { type: String, required: true },
});

mustacheStyleSchema.pre("save", function (next) {
  if (!this.titleSlug) {
    this.titleSlug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("MustacheStyle", mustacheStyleSchema);
