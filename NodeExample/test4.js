
/* 외장모듈 사용 할때  검색 환경 정보에 대한 변수*/
var nconf = require("nconf");  /*모듈 이름 nconf*/
nconf.env();                   /*환경 정보에 대한 변수*/

var val = nconf.get("OS");
console.log(val);