


const express = require("express");
const authorise = require("../middlewares/authorize");
const router = express.Router();

const categorycontroller = require("../controllers/categoryController");

router.post(
  "/addcategory",
  authorise.auth,
  authorise.admin,
  categorycontroller.addcategory
);
router.get("/getcategorybyid/:id", categorycontroller.getcategorybyid);
router.get("/getcategory", authorise.auth, categorycontroller.getcategory);
router.put(
  "/updatecategory/:id",
  authorise.auth,
  authorise.admin,
  categorycontroller.updatecategory
);
router.delete(
  "/deletecategory/:id",
  authorise.admin,
  categorycontroller.deletecategory
);

module.exports = router;