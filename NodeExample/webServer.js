/*https://minder97.tistory.com/entry/Nodejs-%EC%97%90%EC%84%9C-express-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0*/

/*install express,http*/
/*모듈 추출*/
var http = require("http");
var express =require("express");

/*서버 생성*/
var app = express()

app.use(function(request,response){
    response.writeHead(200,{'Content-Type':"text/html"});
    response.end("<h1>Hello express<h1>");
});


http.createServer(app).listen(52273,function(){
    console.log('Server running at http://127.0.0.1:52273')
})
