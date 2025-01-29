const MustacheStyle = require("../models/mustacheStyle");
const jwt = require("jsonwebtoken");

exports.getStyles = async (req, res) => {
  try {
    const styles = await MustacheStyle.find();
    const modifiedStyles = styles.map(style => ({
      id: style._id,
      title: style.title,
      description: style.description,
      imageUrl: `process.env.PORT${style.imageURL}`
    }));
    res.json(modifiedStyles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving styles");
  }
};

exports.getToken = (req, res) => {
  const token = jwt.sign({}, "mustacchi", { expiresIn: "24h" });
  res.json({ token });
};

exports.verifyToken = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "mustacchi", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    next();
  });
};