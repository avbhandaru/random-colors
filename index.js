const express = require('express');
const bodyParser = require('body-parser');
const { chooseColors } = require('./colors');

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(bodyParser.json());

// routes
app.route('/')
  .get((req, res) => {
    const chosenColors = chooseColors(req.body);
    res.json({
      httpType: 'GET',
      type: 'RESPONSE',
      colors: chosenColors
    });
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
