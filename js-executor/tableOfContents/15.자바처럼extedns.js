class 유저 {
  constructor(이름, 나이) {
    this.이름 = 이름;
    this.나이 = 나이;
  }
  sayHi = function () {
    return "안녕 나는 " + this.이름 + this.나이 + " 이야";
  };
}
class 셀러유저 extends 유저 {
  constructor(이름, 나이, 회사) {
    super(이름, 나이);
    this.회사 = 회사;
  }
  sayHi = function () {
    return "안녕 나는 " + this.이름 + this.나이 + this.회사 + " 이야";
  };
}
var user = new 유저("kim", 20);
var seller = new 셀러유저("lee", 30, "ㅇㅇㅇ");
console.log(user);
console.log(user.sayHi());
console.log(seller);
console.log(seller.sayHi());

//////////근데 솔직히 클래스 안씀 왜 안쓸까
////////// class 장점 단점

//1 장점

var a = new Date();
