const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "pdf") {
      return {
        folder: "tech-notes/pdfs",
        resource_type: "raw",
        public_id: Date.now().toString(),
      };
    }

    if (file.fieldname === "thumbnail") {
      return {
        folder: "tech-notes/thumbnails",
        resource_type: "image",
        public_id: Date.now().toString(),
      };
    }

    if (file.fieldname === "roadmapImage") {
      return {
        folder: "tech-notes/roadmaps",
        resource_type: "image",
        public_id: Date.now().toString(),
      };
    }

    return {
      folder: "tech-notes",
      resource_type: "auto",
      public_id: Date.now().toString(),
    };
  },
});

module.exports = multer({ storage });