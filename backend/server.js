const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const notesRoutes = require("./routes/notes");
const categoriesRoutes = require("./routes/categories");
const roadmapsRoutes = require("./routes/roadmaps");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

mongoose.connect("mongodb://127.0.0.1:27017/technotes")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/notes", notesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/roadmaps", roadmapsRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});