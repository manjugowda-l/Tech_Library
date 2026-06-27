const express = require("express");
const router = express.Router();

const authorizeAdmin = require("../middleware/auth");
const Roadmap = require("../models/Roadmap");

router.get("/", async (req, res) => {
  const roadmaps = await Roadmap.find();
  res.json(roadmaps);
});

router.post("/", authorizeAdmin, async (req, res) => {
  const roadmap = await Roadmap.create(req.body);
  res.json(roadmap);
});

router.get("/:id", async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);
  res.json(roadmap);
});

router.put("/:id", authorizeAdmin, async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);
  if (!roadmap)
    return res.status(404).json({ message: "Roadmap not found" });

  roadmap.title = req.body.title;
  roadmap.level = req.body.level;
  roadmap.steps = req.body.steps || [];

  await roadmap.save();
  res.json(roadmap);
});

router.delete("/:id", authorizeAdmin, async (req, res) => {
  await Roadmap.findByIdAndDelete(req.params.id);
  res.json({ message: "Roadmap deleted successfully" });
});

module.exports = router;