var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

console.log("::::::::::::::::::::::::::::");
var urlstr = "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=hello";
var curUrl = url.parse(urlstr);
console.log(curUrl);
var params = querystring.parse(curUrl.query);
console.log(params.query);
console.log("::::::::::::::::::::::::::::");

 http.createServer(function(req,res){
     var q = url.parse(req.url,true);
     var filename =q.pathname;
    
     
     if(filename != "/favicon.ico"){
        fs.readFile("./"+filename,"utf8", function(err,data){
        
             if(err){
                 console.log(err);
             }

             res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
            res.write(data);
             res.end();

         
        });    
         
     }
     
     
     
     
 /*    res.writeHead(200,{"Content-Type":"text/html;charset-UTF-8"});
    res.write(filename);
     res.end("END");
    console.log(url.parse(req.url, true));*/
}).listen(3000);