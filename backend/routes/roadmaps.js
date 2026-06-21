const express = require("express");
const router = express.Router();

const Roadmap = require("../models/Roadmap");

router.get("/", async (req, res) => {
  const roadmaps = await Roadmap.find();
  res.json(roadmaps);
});

router.post("/", async (req, res) => {
  const roadmap = await Roadmap.create(req.body);

  res.json(roadmap);
});


router.get("/:id", async (req, res) => {

  const roadmap =
    await Roadmap.findById(req.params.id);

  res.json(roadmap);

});
module.exports = router;