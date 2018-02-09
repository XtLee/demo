var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');

http.createServer(function(req, res) {
  var pathObj = url.parse(req.url, true)
  console.log('start Server ...')

  if(pathObj.pathname == '/loadMore') {
    var curIndex = pathObj.query.idx
    var len = pathObj.query.len
    var data = []

    for(var i=0;i<len;i++) {
      data.push('内容' + (parseInt(curIndex) + i))
    }
    res.end(JSON.stringify(data))
  } else {
    fs.readFile(path.join(__dirname, pathObj.pathname), function(err, data) {
      if(err) {
        res.statusCode = 404
        res.end('Not Found')
      }else {
        res.end(data)
      }
    })
  }
}).listen(8080)