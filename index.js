const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')

const fs = require('fs');
const pdf = require('pdf-parse');

const app = express();
const port = 3001;

app.use(fileUpload());
app.use(express.static('public'));
app.use(cors());

let dataBuffer= fs.readFileSync('./2019-Annual-Report.pdf');

app.post('/uploadpdf', (req,res) => {

  if (!req.files) {
    return res.status(500).send({msg: "file not found"});
  }

  //console.log('in /uploadpdf, request is ', req);
  console.log(req.files);

  pdf(req.files.file).then((data) => {
    // console.log(data.numpages);
    // console.log(data.numrender);
    // console.log(data.info);
    // console.log(data.metadata);
    // console.log(data.version);
    console.log(data.text);
    res.send(data.text);
  });
});

// pdf(dataBuffer).then((data) => {
//   // number of pages
//   console.log(data.numpages);
//   // number of rendered pages
//   console.log(data.numrender);
//   // PDF info
//   console.log(data.info);
//   // PDF metadata
//   console.log(data.metadata); 
//   // PDF.js version
//   // check https://mozilla.github.io/pdf.js/getting_started/
//   console.log(data.version);
//   // PDF text
//   console.log(data.text); 
// });

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});