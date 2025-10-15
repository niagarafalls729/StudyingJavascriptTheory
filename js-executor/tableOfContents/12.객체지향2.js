function 기계(이름) {
  this.name = 이름;
  this.age = 15;
  this.sayHi = function () {
    console.log("안녕 나는 " + this.name + " 이야");
  };
}

var 학생1 = new 기계("철수");
var 학생2 = new 기계("영희");
학생1.sayHi();
학생2.sayHi();
//prototype 번역:  원형 , 뭐 비유하자면 유전자같은거임
기계.prototype.gender = "남자";
console.log(기계.prototype);

console.log(학생1.gender);
console.log(학생1);
//prototype은 자식에게 복사되지않음. 자식이 부모의 prototype을 참조만함.
//여기서 중요한게 음...
//예를들어 학생1 에서 x를 출력한다 치자
//console.log(학생1.x);
//이때 학생1에 x가 없으니까 prototype을 참조하는데
//기계.prototype에도 x가 없으니까 undefined가 뜸
//학생 => 부모유전자(prototype) => 부모의 부모유전자(prototype) => ... 이런식으로 계속 올라가면서 찾음
//이게 중요한게 prototype에 x가 있으면 그걸 출력함
//즉, prototype은 자식에게 복사되는게 아니라 참조되는거임
//그래서 prototype에 있는걸 바꾸면 자식도 바뀜
//위에 학생1.gender는 바로 위 부모에 gender가 있어서 값이 뜸 .

console.log("--------------------------------------");

var arr = [1, 2, 3];
arr.sort();
// 예를들어 이런 arr 이라는 배열이 있다 치자 근데 sort 는 어떻게 쓰는걸까
// arr.sort() 라고 쓰면 arr 이라는 객체의 prototype을 참조함
// 즉 arr.sort() 라고 쓰면 Array.prototype.sort() 라고 쓰는거임
