
/*node어디에 설치되어 있는지, 실행한 파일 관련 정보  process argument속성*/
console.log(process.argv);
var arr = process.argv;
process.argv.forEach(function(item,index){
    console.log(index, ":", item);
});