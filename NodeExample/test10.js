var fs =require("fs");

/* 파일 만들어 지고 파일에 정보 입력*/
fs.writeFile("./output.txt","hello world,안녕",function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("파일 덮어쓰기 끝");
});