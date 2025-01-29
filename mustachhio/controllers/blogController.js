const BlogPost = require("../models/BlogPost");

exports.getBlogs = async (req, res, { loggedIn, user }) => {
  try {
    const blogs = await BlogPost.find().sort({ postDate: -1 });
    res.render("blog", {
      pageTitle: "Blog",
      blogs,
      path: "/blog", 
      loggedIn,
      user,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getSingleBlog = async (req, res, { loggedIn, user }) => {
  const { titleSlug } = req.params;
  try {
    const blog = await BlogPost.findOne({ titleSlug });
    res.render("blog-single-post", {
      pageTitle: blog.title,
      blog,
      path: `/blog/${titleSlug}`, 
      loggedIn,
      user,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};