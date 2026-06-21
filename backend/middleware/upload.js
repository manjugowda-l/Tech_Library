const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.fieldname === "pdf") {
      cb(null, path.join(__dirname, "../uploads/pdfs"));
    }

    else if (file.fieldname === "thumbnail") {
      cb(null, path.join(__dirname, "../uploads/thumbnails"));
    }

    else if (file.fieldname === "roadmapImage") {
      cb(null, path.join(__dirname, "../uploads/roadmaps"));
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

module.exports = multer({ storage });