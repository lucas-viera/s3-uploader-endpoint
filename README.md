# Endpoint for file uploading to AWS S3 bucket

Using Express and Multer, we'll implement an endpoint which will enable us to upload files to an Amazon Web Services S3 bucket for online storage.

## Project Setup

Startup basic node project

```
npm init -y
```

Install first dependencies we are going to use

```
npm install express multer
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
