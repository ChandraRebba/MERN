var express = require('express');
var pug = require('pug');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is a test' });
  var html=pug.renderFile('index.pug')
});

module.exports = router;
