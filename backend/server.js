const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;


dotenv.config();

const notesRoutes = require("./routes/notes");
const categoriesRoutes = require("./routes/categories");
const roadmapsRoutes = require("./routes/roadmaps");
const adminRoutes = require("./routes/admin");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
//app.use(
//  "/uploads",
//  express.static(
//    path.join(__dirname, "uploads")
//  )
//);
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)

.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.use("/notes", notesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/roadmaps", roadmapsRoutes);
app.use("/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});