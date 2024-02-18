  function authorize(roles) {
  return (req, res, next) => {
    if (req.user && req.user.roles.includes("SUPER")) {
      next();
    } else if (req.user && req.user.roles.some((role) => roles.includes(role))) {
      next();
    } else {
      res.status(403).json({ status: 403, success: false, message: "شما دسترسی به این منبع را ندارید" });
    }
  };
}

module.exports = { authorize };
