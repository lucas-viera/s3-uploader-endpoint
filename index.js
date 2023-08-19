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

//FileFilter: images only
const fileFilter = (req, file, cb) => {
  //se readme
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

//Simple middleware
const upload = multer({ dest: "uploads/", fileFilter });

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

const namedUploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000, files: 2 },
});

app.post("/namedUpload", namedUploads.array("file"), (req, res) => {
  res.json({ stats: "success" });
});

//Error handling
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is to large",
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "too many files",
      });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "invalid file type",
      });
    }
  }
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
