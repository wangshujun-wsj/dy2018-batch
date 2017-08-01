var formidable = require("formidable");
var iconv = require("iconv-lite"); // 转换编码
var http = require('http');
var cheerio = require('cheerio');
var superagent = require('superagent');
var charset = require('superagent-charset')(superagent);

exports.showIndex = function (req, res) {
    res.render('index');
}

exports.upload = function (req, res) {
        var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var url=fields.url;
        superagent.get(url).charset('gb2312') 
            .end(function (err, sres) {
                console.log(sres)
                if (err) {
                    res.send('-1');
                    return;
                }
                var $ = cheerio.load(sres.text);
                var items = [];
                $('#Zoom table tbody tr td a').each(function (index, element) {
                    var $element = $(element);
                    items.push( $element.attr('href'));
                });
                console.log(items)
                res.send(items);
            });
    })

        // get1(url,function(html) {
        //         var items =[]; 
        //         var $ = cheerio.load(html);
        //         var list = $('#Zoom table tbody tr td a');
        //         list.each(function (index, element) {
        //             var $element = $(element);
        //             items.push($element.attr('href'));//拼接HTML
        //         }); 
        //         return items;
        // })
        //     res.send(it);
}
function get1(url, call) {
    http.get(url, function (res) {
        var html = ''
        res.on('data', function (data) {
            html += iconv.decode(data, 'gb2312');
        })
        res.on('end', function () {
            call(html);
        })
    })
}

