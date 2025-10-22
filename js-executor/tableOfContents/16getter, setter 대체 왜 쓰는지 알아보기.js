// var 사람 = {
//   name: "kim",
//   age: 20,
//   nextAge: function () {
//     return this.age + 1;
//   },
// };
// console.log(사람.nextAge());
// 그냥 데이터를 뽑아주는, 가져와주는, get 해주는 함수들은 get 쓰시면 되고
// 데이터를 입력해주는, 수정해주는, set 해주는 함수들은 set 쓰시면 됩니다.
// 그리고 규칙도 있습니다.
// set 함수는 데이터를 입력해서 수정해주는 함수니까 파라미터가 한개 꼭 존재해야하고
// get 함수는 파라미터가 있으면 안되고 함수 내에 return을 가져야합니다.
// 잘못 쓰면 에러를 알려주니까 외울 건 없고
// 보통 그냥 get 느낌나는 함수들은 get 붙이면 별일 없으니 그닥 어렵진 않습니다.

class 사람 {
  constructor() {
    this.name = "Park";
    this.age = 20;
  }
  get nextAge() {
    return this.age + 1;
  }
  set setAge(나이) {
    this.age = 나이;
  }
  nextAge2 = function () {
    return this.age + 1;
  };
}

var 사람1 = new 사람();
console.log(사람1);
console.log(사람1.nextAge2());
console.log(사람1.nextAge);
사람1.setAge = 50;
console.log(사람1);
