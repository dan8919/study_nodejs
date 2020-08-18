/*객체를 모듈화*/
var obj ={};

obj.add = function(a,b){
    return a+b;
}

obj.sub = function(a,b){
    return a-b;
}

module.exports = obj;