const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
    const data = await Category.find();
    res.json(data);
});

router.post("/", async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
  });

  res.json(category);
});


router.post("/", async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
    description: req.body.description,
  });

  res.json(category);
});


router.delete("/all", async (req, res) => {
  await Category.deleteMany({});
  res.json({ success: true });
});


module.exports = router;