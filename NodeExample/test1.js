/*jslint devel: true */

console.log("hello world");

console.log("숫자입니다. %d", 10);

console.log("문자열 입력. %s", "안녕");

var obj = {
    id : "m001",
    name : "john",
    age : 15
};
console.log("JSON객체입입니다. %j", obj);

console.dir(obj);

console.log(obj);

console.time("duration");
var result = 0;
for(var i =0; i<10000; i++){
    result += i;
}
console.timeEnd("duration");

/*어느 파일의 정보가 실행?*/
console.log(__filename);
/*디렉토리 정보 알려줌*/
console.log(__dirname);
