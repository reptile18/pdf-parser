const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const fs = require('fs');
const pdf = require('pdf-parse');

const app = express();
const port = 3001;

app.use(fileUpload());
app.use(express.static('public'));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post('/uploadpdf', (req,res) => {

  if (!req.files) {
    return res.status(500).send({msg: "file not found"});
  }

  console.log(req.files);

  pdf(req.files.file).then((data) => {
    console.log(data.text);
    res.send(data.text);
  });
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
