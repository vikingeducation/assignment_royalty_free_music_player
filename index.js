const express = require('express')
const app = express()
const path = require('path');
app.use('/images', express.static(path.join(__dirname + '/images')));
app.use('/music', express.static(path.join(__dirname + '/music')));
app.use('/styles.css', express.static('styles.css'));
app.use('/music.js', express.static('music.js'))
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/index.html'))
});


const port = process.env.PORT || '3000'
app.listen(port)