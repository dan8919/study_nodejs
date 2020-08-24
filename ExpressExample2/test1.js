var express = require("express");
var static = require("serve-static");
var path = require("path");
var bodyParser =require("body-parser")
var cookieParser = require("cookie-parser");
var app = express();


app.use(static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());


/*app.get("/test/test",function(req,res){
    res.send("test/test");
});*/



/* router 사용하여 fetful 방식으로*/
var router = express.Router();


/*cookie*/
router.route("/process/setUserCookie").get(function(req,res){
   console.log("/process/setUserCookie call") ;
    res.cookie("user",{
        id:'m001',
        name:'kim',
        age:16
    });
    res.redirect("/process/showCookie");
});


router.route("/process/showCookie").get(function(req,res){
    res.send(req.cookies);
})

/*cookie 삭제*/
router.route("/process/delCookie").get(function(req,res){
    res.clearCookie("user");
    res.redirect("/");
})










router.route("/process/getUser/:id").get(function(req,res){
    var msg =`
        <h1>/process/getUser/:id로 접근했음</h1>
        <p> id : ${req.params.id}</p>
        
`;
    res.send(msg);
});














router.route("/process/getShow").get(function(req,res){
    
    var msg =`
<h1>localhost:3000/process/getShow?id=m001&name=kim접근했을때<h1>
<p>id:${req.query.id}</p>
<p>name:${req.query.name}</p>
`;
res.send(msg);
});

router.route("/process/login").post(function(req,res){
   console.log("/process/login 접속") ;
    
    
    var msg = `
login.html로 부터 넘겨받은 데이터<br>
 id : ${req.body.id},
 pw : ${req.body.pw}

`;
    res.send(msg);
});

app.use("/",router)


app.listen(3000,function(req,res){
    console.log("ExpressExample2에 서버가 가동중입니다.")
});