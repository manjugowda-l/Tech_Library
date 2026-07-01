const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Category = require("../models/Category");
const upload = require("../middleware/upload");
const authorizeAdmin = require("../middleware/auth");

router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

router.post(
  "/",
  authorizeAdmin,
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
  req.files?.pdf?.[0]?.path || "";

const thumbnail =
  req.files?.thumbnail?.[0]?.path || "";

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




// UPDATE NOTE
router.put(
  "/:id",
  authorizeAdmin,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  async (req, res) => {

    const note =
      await Note.findById(req.params.id);

    if (!note)
      return res.status(404).json({
        message: "Note not found"
      });

    note.title =
      req.body.title;

    note.description =
      req.body.description;

    note.category =
      req.body.category;

    if (req.files?.pdf?.[0]) {
      note.pdfUrl =
  req.files.pdf[0].path;
    }

    if (req.files?.thumbnail?.[0]) {
      note.thumbnail =
  req.files.thumbnail[0].path;
    }

    await note.save();

    res.json(note);

  }
);


// DELETE NOTE

router.delete(
  "/:id",
  authorizeAdmin,
  async (req, res) => {

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Note deleted successfully"
    });

  }
);



module.exports = router;