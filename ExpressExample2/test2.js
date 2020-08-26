var express = require("express");
var static = require("serve-static");
var path = require("path");
var bodyParse = require("body-parser");
var expressSession = require("express-session");
var fs = require("fs");
var nodemailer = require("nodemailer"); 
var multer = require("multer");


var app = express();
app.use(static(path.join(__dirname,"public")));
app.use("/upload2",static(path.join(__dirname,"upload2")));
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());


app.use(expressSession({
     secret:"gangnam4" ,  /*암호화*/
        resave:true,
        saveUnintialized:true
}));

/*어디에 저장할 건지*/
var storage = multer.diskStorage({
    destination:function(req,file,callback){
    callback(null,"upload2");
},
    filename:function(req,file,callback)
    {
        callback(null,
                 Date.now()+"__"+file.originalname);
    }
});

var upload = multer({
   storage:storage,
    limits:{
        files:10,
        fileSize:1024*1024*10      /*10M*/
    }
});


var router =express.Router();

/*html 에서 file 이라함*/
router.route("/process/upload").post(upload.array("file",1),
                                     function(req,res){
    console.log("/process/upload call");
    console.log(req.files);
    console.log(req.body.id);
    
    var files =req.files;
    
    var id = req.body.id;
    var orgname = files[0].originalname;
    var filename =files[0].filename;
    
    res.send(`
        <h1>파일 업로드 성공</h1>
        <p>ID:${id}</p>
        <p>orgname:${orgname}</p>
        <p>filename:${filename}</p>
        <img src="/upload2/${filename}">

`);
    
})


/*이메일 관련*/
router.route("/user/email").post(function(req,res){
    console.log("/user/email call");
    
    var sender=req.body.sender;
    var senderpw=req.body.senderpw;
    var receiver=req.body.receiver;
    var subject=req.body.subject;
    var content=req.body.content;
    
    /*어디에서 누가 발송할건지*/
    
   var transporter = nodemailer.createTransport({
       service:"Naver",  /*smtp 메일 발송 서버*/
       host:"smtp.naver.com",
       port:587,
       secure:false,
       auth:{
           user:sender,
           pass:senderpw
       }
   });
    
    var mailOptions ={
        from:sender,
        to:receiver,
        subject:subject,
        text:content
    };
    
    
   /*이메일 발송*/ 
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
            return;
        }
        res.send("발송 성공")
    })
    
    
    
})


/*router 안에 router 들어가면 안됨! 주의*/

router.route("/user/email").get(function(req,res){
        console.log("/user/email call");
    
     /*로그인 안 되어있으면 로그인 화면으로 이동*/
    if(req.session.user){
        fs.readFile("./email2.html","utf-8",function(err,data){
            res.send(data);
        });
        
    }else{
        res.redirect("/login2.html");
    }
  });
    
    




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


/* 로그아웃 */

router.route("/user/logout").get(function(req,res){
    console.log("/user/logout call");
    
    if(req.session.user){
        req.session.destroy(function(err){
            if(err){
                    console.log("세션 삭제 중 에러 발생");
                return;
            }
            console.log("세션 삭제 성공");
             res.redirect("/login2.html");
        })
        
    }else{
        console.log("로그인이 되어있지 않음");
        res.redirect("/login2.html");
    }
});

app.use("/",router);


app.listen(3000,function(){
    console.log("서버 구동 중")
});