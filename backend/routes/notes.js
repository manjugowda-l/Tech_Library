const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Category = require("../models/Category");
const upload = require("../middleware/upload");

router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

router.post(
  "/",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  async (req, res) => {

    const {
      title,
      description,
      category
    } = req.body;

    const pdfUrl =
      req.files?.pdf?.[0]?.filename || "";

    const thumbnail =
      req.files?.thumbnail?.[0]?.filename || "";

    let existingCategory =
      await Category.findOne({
        name: category
      });

    if (!existingCategory) {
      existingCategory =
        await Category.create({
          name: category
        });
    }

    const note = await Note.create({
      title,
      description,
      category,
      pdfUrl,
      thumbnail
    });

    res.json(note);
  }
);

router.get("/:id", async (req, res) => {

  const note =
    await Note.findById(req.params.id);

  res.json(note);

});

module.exports = router;