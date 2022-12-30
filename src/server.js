const express = require('express');
const path = require('path');
const app = express();
const router = require('express').Router();
const api = require('./api/pokemon')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'..','public')));

app.get('/',(req,res,next) => {
  res.sendFile(path.join(__dirname,'..','client','index.html'))
});

app.use('/api', api)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});