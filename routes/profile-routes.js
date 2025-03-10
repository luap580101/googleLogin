const router = require("express").Router();
const Post = require("../models/post-model");

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/auth/login");
  }
};
router.get("/", authCheck, async (req, res) => {
  const postFound = await Post.find({ author: req.user._id });
  console.log(postFound);
  return res.render("profile", { user: req.user, posts: postFound });
});

router.get("/post", authCheck, (req, res) => {
  return res.render("post", { user: req.user });
});

router.post("/post", authCheck, async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content, author: req.user._id });
  try {
    await newPost.save();
    return res.redirect("/profile");
  } catch (err) {
    req.flash("error_msg", "標題與內容都需要填寫。");
    return res.redirect("/profile/post");
  }
});

module.exports = router;
