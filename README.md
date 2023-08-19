# Endpoint for file uploading to AWS S3 bucket

Using Express and Multer, we'll implement an endpoint which will enable us to upload files to an Amazon Web Services S3 bucket for online storage.

## Project Setup

Startup basic node project

```
npm init -y
```

Install first dependencies we are going to use

```
npm install express multer uuid
```

Install dev devependencies for running serve live

```
npm install nodemon --save-dev
```

## Project testing

Using Postman, execute a `POST` request to `localhost:4000/upload`.

Select `Body` / `form-data` and complete as follows:

```
key: file
value: image.jpg
```

## Project Running

As we updated `package.json` run script, we just need to run this:

```
npm start
```

## Multer

```javascript
app.post("/multiUpload", multiUpload, (req, res) => {
  console.log(req.files); //here
  res.json({ status: "success" });
});
```

Generates the output

```json
{
  "fieldname": "resume",
  "originalname": "IMG_7313.jpg",
  "encoding": "7bit",
  "mimetype": "image/jpeg",
  "destination": "uploads/",
  "filename": "3d715595d16c5c1d95e37cdbf7be1b87",
  "path": "uploads/3d715595d16c5c1d95e37cdbf7be1b87",
  "size": 2835817
}
```

File filtering in Multer: https://expressjs.com/en/resources/middleware/multer.html

Set this to a function to control which files should be uploaded and which should be skipped. The function should look like this:

```javascript
function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  cb(null, false);

  // To accept the file pass `true`, like so:
  cb(null, true);

  // You can always pass an error if something goes wrong:
  cb(new Error("I don't have a clue!"));
}
```

## ToDo's

- Catch error when destination folder does not exists for multer and create it or send it to a default path. `Error: ENOENT: no such file or directory`
