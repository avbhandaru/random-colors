const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { chooseColors } = require('./colors');

const IndexFile = path.join(__dirname + '/public/index.html');
const ErrorFile = path.join(__dirname + '/public/error.html');

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.route('/')
  .get((req, res) => {
    res.status(200).sendFile(IndexFile);
  })

app.route('/api/colors')
  .get((req, res) => {
    if (req.body.quantity) {
      const chosenColors = chooseColors(req.body);
      res.status(200).json({
        httpType: 'GET',
        type: 'RESPONSE',
        colors: chosenColors
      });
    } else {
      res.status(500).sendFile(ErrorFile);
    }
  })
  .post((req, res) => {
    res.send('POST request... N/A')
  })
  .delete((req, res) => {
    res.send('DELETE request... N/A');
  });

// listen
app.listen(port, () => {
  console.log('[index.js] App Listening at port:', port)
});
