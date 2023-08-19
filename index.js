const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
const app = express();

//Naming uploads
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "namedUploads");
  },
  filename: (req, file, cb) => {
    //destructure the file
    const { originalname } = file; //see readme
    cb(null, `${uuid()}-${originalname}`);
  },
});

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

const namedUploads = multer({ storage });
app.post("/namedUpload", namedUploads.array("file"), (req, res) => {
  res.json({ stats: "success" });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
