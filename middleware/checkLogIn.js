module.exports = (req, res, next) => {
  try {
    if (req.session.user.name == "admin" && req.session.token) {
      console.log("aaaa");
      next();
    } else {
      console.log("bbbb");
      res.redirect("/question-answer-login");
    }
  } catch (error) {
    console.log("cccc");
    res.redirect("/question-answer-login");
  }
};
