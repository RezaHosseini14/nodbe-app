const { EventController } = require("../controllers/event.controller");
const { checkAll } = require("../middlewares/checkAll");
const { authorize } = require("../middlewares/checkAuthorize");
const { validatorMapper } = require("../middlewares/checkError");
const { checkLogin } = require("../middlewares/checkLogin");
const { eventValidator } = require("../validators/event");

const router = require("express").Router();

router.post("/add", checkLogin, EventController.addEvent);
router.delete("/delete/:id", checkLogin, authorize("ADMIN"), checkAll, checkLogin, EventController.deleteEvent);
router.put("/update/:id", checkLogin, authorize("ADMIN"), checkAll, EventController.updateEvent);
router.get("/all", EventController.getAll);
router.get("/:id", checkLogin, EventController.getEvent);

module.exports = {
  eventRouter: router,
};
