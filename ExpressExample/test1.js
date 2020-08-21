/* res 는 한번만 실행 가능 */

var express = require("express");
var static = require("serve-static");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

/* http://localhost:3000/test.png     public 폴더에 있는 사진보기/login.html파일 접근*/
app.use(static(path.join(__dirname,"public")));

/* bodyparser관련    https://velog.io/@yejinh/express-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-bodyParser-%EB%AA%A8%EB%93%88 */
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());



/*미들웨어 사용 use, next  있으면 미들웨어. next()있으면 다음동작 실행 없으면 안함*/
app.use(function(req,res,next){
    console.log("1st middleware call");
    req.id = "teacher";
    next();
    
});

/*특정 주소에만 미들웨어 실행*/
app.use("/user/login",function(req,res,next){
    console.log("1-2...................................");
    next();
})

app.use(function(req,res,next){
    console.log("2nd middlewate call:",req.id);
    next();
});

/*pathvariable 형태 spring 중괄호 node :  */
app.use("/test/:id",function(req,res,next){
    console.log("3th middleware call");
    
    var id = req.params.id;
  /*  res.send(id);*/
    console.log(id);
    next();
});


/* Get  req.query.파라미터  테스트: http://localhost:3000/?pw=111 */
app.use(function(req,res,next){
    console.log("4th middleware call");
    var pw = req.query.pw;
   /* res.send(pw);*/
    console.log(pw);
    next();
});


/* POST  req.body.파라미터  테스트: */
app.use(function(req,res,next){
    console.log("5th middleware call");
    var id = req.body.id;
    res.send(id);
});




/*시간 관련 request */
/*var requestTime = function(req,res,next){
    req.requestTime = Date.now()
    next()
};
app.use(requestTime);

app.get('/', function (req, res) {
    var responseText ='Hello world!<br>'
    responseText +='<small>Requested at:'+ req.requestTime+'</samll>'
  res.send(responseText);
});*/




/*포스트 번호, 호스트 네임,function*/
app.listen(3000,function(){
    console.log("서버 실행");
});