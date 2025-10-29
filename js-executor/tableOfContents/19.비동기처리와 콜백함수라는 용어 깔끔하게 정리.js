// 자바스크립트에서 1초 쉬고 뭔가 출력하는 코드를 작성하려면

console.log(1);
setTimeout(function () {}, 1000);
console.log(2);
// 보통 프로그래밍 언어처럼 이렇게 작성하면 될까요?

// 안됩니다. 1과 2가 콘솔창에 동시에 출력됩니다.

//web API
//setTimeout, eventListener, DOM API 등
//자바스크립트 엔진이 아닌 브라우저가 제공하는 API
//자바스크립트 엔진은 web API를 호출만 하고 기다리지 않음
//브라우저가 web API를 처리하는 동안 자바스크립트 엔진은 다음 코드를 계속 실행
//따라서 1과 2가 동시에 출력됨

//동기식은 멈춤
// 동기식처리, synchronous
// 자바스크립트 엔진이 코드를 한 줄씩 차례대로 실행
// 이전 코드가 완료되어야 다음 코드 실행

function 첫번째함수(index = "") {
  return new Promise((resolve) => {
    console.log("첫번째 함수 시작" + index);
    resolve();
  });
}

function 두번째함수(index = "") {
  return new Promise((resolve) => {
    console.log("두번째 함수 시작" + index);
    resolve();
  });
}

function 세번째함수(index = "") {
  return new Promise((resolve) => {
    console.log("세번째 함수 시작" + index);
    resolve();
  });
}

첫번째함수()
  .then(() => 두번째함수())
  .then(() => 세번째함수());

async function 실행(index) {
  await 첫번째함수(index);
  await 두번째함수(index);
  await 세번째함수(index);
}
실행("async");

for (let i = 0; i < 10; i++) {
  new Promise((resolve, reject) => {
    if (i % 2 === 0) {
      resolve(i);
    } else {
      reject(i);
    }
  })
    .then((val) => console.log(val + " → 성공"))
    .catch((val) => console.log(val + " → 실패"))
    .finally(() => console.log(i + "번째 완료"));
}
// 이 경우 i % 2 !== 0인 조건이 있으므로, 결국 reject()가 실행됩니다.

//
// | 메서드             | 의미                      | 실행 시점                  |
// | ----------------- | --------------------------| ----------------------     |
// | resolve(value)    | 약속을 “지킴” (성공 처리)   | 비동기 작업이 성공했을 때    |
// | reject(reason)    | 약속을 “못 지킴” (실패 처리)| 비동기 작업이 실패했을 때     |
// | then(callback)    | 약속을 지켰을 때 실행       | resolve()가 호출되면 실행    |
// | catch(callback)   | 약속을 못 지켰을 때 실행    | reject()가 호출되면 실행     |
// | finally(callback) | 결과와 상관없이 실행        | resolve든 reject든 항상 실행 |

// 상태는 3가지임
// 성공하면 resolved
// 실패하면 rejected
// 대기중이면 pending
// 한 번 settled(성공 or 실패)되면 상태가 바뀌지 않음
