const express = require("express");
const multer = require("multer");
const app = express();

//Simple middleware
const upload = multer({ dest: "uploads/" });

//Single file upload
app.post("/uploadSingle", upload.single("file"), (req, res) => {
  res.json({ status: "success" });
});

//Multiple files upload
app.post("/uploadMultiple", upload.array("file"), (req, res) => {
  res.json({ status: "success" });
});

//Multiple fields middleware
const multiUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

app.post("/multiUpload", multiUpload, (req, res) => {
  console.log(req.files);
  res.json({ status: "success" });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
