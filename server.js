var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('./certs/stagingsdei_com.key', 'utf8');
var certificate = fs.readFileSync('./certs/c86aaff33f318ca4.crt', 'utf8');
var ca = fs.readFileSync('./certs/gd_bundle-g2-g1.crt');
var request = require('request');
var httpsOptions = {key: privateKey, cert: certificate, ca: ca};


var httpsServer = https.createServer(httpsOptions, app);

app.use(express.static(__dirname + '/dist' ) )

app.get('*', function(req,res){
  	res.sendFile("index.html", { root: __dirname+'/dist' })
})
httpsServer.listen(443);
