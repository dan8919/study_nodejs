/*내장모듈 사용하기*/
var os = require("os");

console.log(os.hostname());
console.log(os.freemem());

console.log(">>>>>>>>>>>>>>>>>>>>>>>");

var path = require("path");
var str = path.join("/Users/admin","all.exe");
console.log (str);
console.log(path.sep);
console.log(path.dirname(str));  /*폴더명*/
console.log(path.basename(str)); /*파일명*/
console.log(path.extname(str));  /*확장자명*/

console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
/*parse root  dir base ext name*/
console.log(path.parse("admin/Desktop/show2.png"));
console.log(path.parse(str));