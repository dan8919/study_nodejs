var express = require("express");
var static = require("serve-static");
var path = require("path");
var bodyParse = require("body-parser");
var expressSession = require("express-session");
var fs = require("fs");


var app = express();
app.use(static(path.join(__dirname,"public")));
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());


app.use(expressSession({
     secret:"gangnam4" ,  /*암호화*/
        resave:true,
        saveUnintialized:true
}));

var router =express.Router();

router.route("/user/login").post(function(req,res){
    console.log("/user/login call");
    
    var paramId = req.body.id;
    var paramPw = req.body.pw;
    
    if(req.session.user){
        res.redirect("/user/product")
    }else{
        req.session.user = {
            id:paramId,
            pw:paramPw
        };
        res.send(
            `
<h1>로그인 성공</h1>
<p>${paramId}</p>
<p>${paramPw}</p>

<p><a href="/user/product">상품페이지로 이동</a>
</p>

`
        )}; 
});

    router.route("/user/product").get(function(req,res){
        console.log("/user/product call");
     /*로그인 안 되어있으면 로그인 화면으로 이동*/
    if(req.session.user){
        fs.readFile("./product.html","utf-8",function(err,data){
            res.send(data);
        });
        
    }else{
        res.redirect("/login2.html");
    }
                                      });

app.use("/",router);


app.listen(3000,function(){
    console.log("서버 구동 중")
});