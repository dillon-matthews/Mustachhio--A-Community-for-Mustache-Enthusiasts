const MustacheStyle = require("../models/mustacheStyle");
const fs = require("fs");
const path = require("path");

exports.createStyle = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const { title, description } = req.body;
  const imageFile = req.files.image;
  const uploadDir = path.join(__dirname, "..", "public", "images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const uploadPath = path.join(uploadDir, imageFile.name);

  try {
    await imageFile.mv(uploadPath);

    const newStyle = new MustacheStyle({
      title,
      description,
      imageURL: `/images/${imageFile.name}`,
    });

    await newStyle.save();
    res.redirect("/styles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving style");
  }
};

exports.getStyles = async (req, res, options) => {
  try {
    const styles = await MustacheStyle.find();
    res.render("gallery", {
      pageTitle: "Mustacchio",
      path: "/styles", 
      styles: styles,
      ...options,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving styles");
  }
};

exports.getSingleStyle = async (req, res, options) => {
  try {
    const style = await MustacheStyle.findOne({ titleSlug: req.params.styleSlug });
    if (!style) {
      return res.status(404).send("Style not found");
    }
    res.render("gallery-single-post", {
      pageTitle: style.title,
      path: `/styles/${style.titleSlug}`,
      style: style,
      ...options,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving style");
  }
};