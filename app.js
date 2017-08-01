var express = require('express');
var app = express();
var router = require('./router/router.js')
var formidable = require("formidable");
var iconv = require("iconv-lite"); // 转换编码
var http = require('http');
var cheerio = require('cheerio');
var superagent = require('superagent');
var charset = require('superagent-charset')(superagent);

app.set("view engine", "ejs");
app.use(express.static('./public'));

app.post('/upload', router.upload);

app.use('/', router.showIndex);

app.listen(3000);