module.exports = (req, res, next) => {
    try {
      if (req.session.user.name && req.session.token) {
        console.log("aaaa");
        next();
      } else {
        console.log("bbbb");
        res.redirect("/staff/staff-login");
      }
    } catch (error) {
      console.log("cccc", error);
      res.redirect("/staff/staff-login");
    }
  };
  