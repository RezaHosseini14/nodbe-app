function checkUserStatus(req, res, next) {
  if (req.user && req.user.status) {
    res.status(403).json({ status: 403, sucess: false, message: "حساب کاربری شما مسدود شده است" });
  } else {
    next();
  }
}

module.exports = {
  checkUserStatus,
};
