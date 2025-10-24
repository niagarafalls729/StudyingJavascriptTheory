var arr = [2, 3, 4];

var a = arr[0];
var b = arr[1];
var c = arr[2];
console.log(a, b, c);
var [d, e, f] = arr;
console.log(d, e, f);

//위치 상관 없음 OBJECT는 키
//이런식으로 디폴트가능 .....................
var { age, name = "JISU" } = { name: "Kim", age: 30 };
console.log(name, age);
