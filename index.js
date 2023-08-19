const express = require("express");
const multer = require("multer");
const app = express();

const upload = multer({ dest: "uploads/" }); //middleware

//Single file upload
app.post("/uploadSingle", upload.single("file"), (req, res) => {
  res.json({ status: "success" });
});

//Multiple files upload
app.post("/uploadMultiple", upload.array("file"), (req, res) => {
  res.json({ status: "success" });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
