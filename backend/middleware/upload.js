const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "tech-notes";

    if (file.fieldname === "pdf") {
      folder = "tech-notes/pdfs";
    } else if (file.fieldname === "thumbnail") {
      folder = "tech-notes/thumbnails";
    } else if (file.fieldname === "roadmapImage") {
      folder = "tech-notes/roadmaps";
    }

    return {
      folder,
      resource_type: "auto",
      public_id: Date.now().toString(),
    };
  },
});

module.exports = multer({ storage });