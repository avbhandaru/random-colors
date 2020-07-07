const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { chooseColors } = require('./colors');

const IndexFile = path.join(__dirname + '/public/index.html');
// const ErrorFile = path.join(__dirname + '/public/error.html');

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.route('/')
  .get((req, res) => {
    res.status(200).render(IndexFile);
  })

app.route('/api/colors')
  .post((req, res) => {
    if (req.body.quantity) {
      const chosenColors = chooseColors(req.body);
      res.status(200).json({
        httpType: 'GET/POST',
        type: 'RESPONSE',
        colors: chosenColors
      });
    } else {
      res.status(500);
    }
  })
  .delete((req, res) => {
    res.send('DELETE request... N/A');
  });

// listen
app.listen(port, () => {
  console.log('[index.js] App Listening at port:', port)
});
