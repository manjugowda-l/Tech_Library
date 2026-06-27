const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authorizeAdmin = require("../middleware/auth");

router.get("/", async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

router.post("/", authorizeAdmin, async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
    description: req.body.description,
  });

  res.json(category);
});

router.put("/:id", authorizeAdmin, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).json({ message: "Category not found" });

  category.name = req.body.name;
  category.description = req.body.description;

  await category.save();
  res.json(category);
});

router.delete("/:id", authorizeAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted successfully" });
});

module.exports = router;