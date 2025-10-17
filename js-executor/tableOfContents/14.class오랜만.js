class User {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }
  printAll = function () {
    return "name: " + this.name + ", phone: " + this.phone;
  };
}

/////↑위나 아래나 같음 ↓/////
function User2(name, phone) {
  this.name = name;
  this.phone = phone;
  this.printAll = function () {
    return "name: " + this.name + ", phone: " + this.phone;
  };
}

var user1 = new User("kim", "01012555345678");
var user2 = new User2("lee", "0101244345678");
console.log(user1);
console.log(user2);
console.log(user1.printAll());
console.log(user2.printAll());

console.log("--------------------------------------");

