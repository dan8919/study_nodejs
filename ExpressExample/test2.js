/*템플릿 리터럴*/
var express = require("express");
var app = express();


app.use(function(req,res,next){
    var name = "jane";
    var msg = `

hello, ${name}

<!DOCTYPE html>
<html>
    <body>
        <form action="/aaa" method="post">
            <input name="id">
            <input type="submit" value="제출">
        </form>
    
    </body>

</html>
`;
    
    res.send(msg);
    console.log(msg);
    
  
    
});



app.listen(3000,function(){
    console.log("서버 구동 중");
});