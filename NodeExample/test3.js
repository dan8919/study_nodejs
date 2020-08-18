/*calc 모듈 사용하기 현재 폴더 './'  **require 함수 사용 */
var  calc = require('./calc');
console.log(calc.add(2,5));

var calc2 = require('./calc2');
console.log(calc2.sub(5,2));

/*객체모듈 사용*/
var calc3 = require('./calc3');
console.log(calc3.add(10,10));
console.log(calc3.sub(10,5));