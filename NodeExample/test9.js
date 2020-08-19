var fs = require("fs");

/*동기화*/

console.log(11111);
var data = fs.readFileSync("./a.html","utf8");
console.log(data);
console.log(11111);

console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

/*비동기화 방법*/
console.log("aaaaaa");
fs.readFile("./a.html","utf8",function(err,data){
    console.log("bbbbbbbbbbbbbb")
    console.log(data);
});
console.log("ccccccccc");