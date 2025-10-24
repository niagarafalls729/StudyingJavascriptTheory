/****************************************************************************************
 🧩 브라우저의 자바스크립트 동작 원리 완전 정리
-----------------------------------------------------------------------------------------
 자바스크립트는 '싱글 스레드' 언어이지만, 브라우저가 제공하는 '비동기 환경(Web API)' 덕분에
 동시에 여러 작업을 처리할 수 있는 것처럼 보입니다.
 즉, "하나는 실행 중, 나머지는 기다리는 중" 구조입니다.
****************************************************************************************/

/****************************************************************************************
 1 Call Stack (호출 스택)
 - 자바스크립트 엔진이 실제로 코드를 실행하는 공간
 - 함수가 호출되면 Stack에 쌓이고, 실행이 끝나면 제거됨 (LIFO 구조)
 - Stack이 빌 때까지 다른 작업은 대기
****************************************************************************************/
function a() {
  function first() {
    console.log(" 1 first() 시작");
    second();
    console.log(" 1 first() 끝");
  }

  function second() {
    console.log(" 2 second() 실행");
  }

  console.log("💡 [Call Stack 예시 시작]");
  first();
  console.log("💡 [Call Stack 예시 끝]");
}
/*
출력 순서
💡 [Call Stack 예시 시작]
1 first() 시작
2 second() 실행
1 first() 끝
💡 [Call Stack 예시 끝]
*/

/****************************************************************************************
 2 Web API (브라우저가 제공하는 비동기 처리 영역)
 - JS 엔진 외부에 존재하며, 브라우저가 제공하는 기능 모음
 - setTimeout, DOM 이벤트, fetch, XMLHttpRequest 등
 - JS 엔진은 해당 작업을 브라우저에게 위임하고 다음 코드를 바로 실행
****************************************************************************************/
function b() {
  console.log("\n--- Web API 예시 ---");
  console.log("시작");

  setTimeout(() => {
    console.log(
      "⏰ setTimeout 콜백 실행 (Web API → Callback Queue → Call Stack)"
    );
  }, 1000);

  console.log("끝");
}

/*
출력 순서
시작
끝
(1초 후) ⏰ setTimeout 콜백 실행
*/

/****************************************************************************************
 3 Callback Queue (콜백 대기열)
 - Web API에서 완료된 콜백 함수들이 대기하는 공간 (FIFO 구조)
 - 단, Call Stack이 완전히 비어야 Event Loop가 큐에서 콜백을 꺼냄
****************************************************************************************/

/*
예)
1. setTimeout()이 호출되면 타이머는 Web API에서 작동
2. 1초 뒤 타이머 완료 → 콜백이 Callback Queue에 들어감
3. Event Loop가 Call Stack이 비었는지 확인
4. 비어 있으면 Queue에서 콜백 하나를 Stack으로 이동 → 실행됨
*/

/****************************************************************************************
 4️⃣ Event Loop (이벤트 루프)
 - Call Stack과 Callback Queue를 "지속적으로 감시"하는 존재
 - Stack이 비면 Queue의 콜백을 Stack으로 이동시킴
 - 이 덕분에 JS는 싱글 스레드임에도 비동기 처리가 가능
****************************************************************************************/
function c() {
  console.log("\n--- Event Loop 동작 예시 ---");
  console.log("1");

  setTimeout(() => console.log("2 (setTimeout 콜백 실행)"), 1000);

  console.log("3");
}

/*
출력 순서: 1 → 3 → 2
설명:
 - setTimeout 콜백은 Web API에서 처리 후 Queue로 들어감
 - Call Stack이 비어야 Event Loop가 콜백을 옮김
*/

/****************************************************************************************
 5️⃣ Stack & Queue (자료구조 개념 비교)
****************************************************************************************/
function d() {
  console.log("\n--- Stack & Queue 구조 ---");

  // Stack: LIFO (Last In First Out)
  const stack = [];
  stack.push("A");
  stack.push("B");
  stack.push("C");
  console.log("Stack:", stack);
  console.log("Stack pop() →", stack.pop()); // C (마지막이 먼저)
  console.log("현재 Stack:", stack);

  // Queue: FIFO (First In First Out)
  const queue = [];
  queue.push("A");
  queue.push("B");
  queue.push("C");
  console.log("Queue:", queue);
  console.log("Queue shift() →", queue.shift()); // A (먼저 들어온 게 먼저)
  console.log("현재 Queue:", queue);
}

/****************************************************************************************
 6️⃣ Single Thread & Non-blocking I/O
 - JS는 싱글 스레드이므로 한 번에 하나의 작업만 수행
 - 하지만 비동기 작업을 Web API에 위임하여 블로킹 없이 다른 코드 실행 가능
 - 즉, 'I/O(입출력)' 작업을 기다리지 않고 다음 코드를 실행함
****************************************************************************************/
function e() {
  console.log("\n--- Non-blocking I/O 예시 ---");
  console.log("1 작업 시작");

  setTimeout(
    () => console.log("⏰ 비동기 작업 완료 (Web API 처리 후 실행)"),
    1000
  );

  console.log("2 다음 코드 실행");
}

/*
출력:
1 작업 시작
2 다음 코드 실행
⏰ 비동기 작업 완료
*/

/****************************************************************************************
 7️⃣ fetch() 예시 - 비동기 네트워크 호출
 - fetch()는 브라우저 Web API 중 하나로, 네트워크 요청을 비동기적으로 처리
****************************************************************************************/
function f() {
  console.log("\n--- fetch 비동기 예시 ---");

  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => res.json())
    .then((data) => console.log("📦 fetch 응답 데이터:", data))
    .catch((err) => console.error("❌ fetch 에러:", err));

  console.log("📡 네트워크 요청 중... (비동기적으로 진행됨)");
}

/*
출력 순서:
📡 네트워크 요청 중...
📦 fetch 응답 데이터: { userId: 1, id: 1, title: "...", body: "..." }

설명:
 - fetch()는 바로 실행되지 않음 → Web API에서 네트워크 요청 담당
 - 응답이 완료되면 콜백이 Callback Queue로 이동
 - Call Stack이 비면 Event Loop가 콜백을 옮겨 실행
*/

/****************************************************************************************
 ✅ 전체 정리 요약

 🧠 실행 순서 요약
 1. Call Stack: 함수 실행 공간 (동기 코드 처리)
 2. Web API: 브라우저 비동기 작업 담당 (setTimeout, fetch 등)
 3. Callback Queue: 완료된 비동기 콜백 대기 (FIFO)
 4. Event Loop: Stack이 비면 Queue에서 콜백 이동
 5. Stack & Queue: LIFO / FIFO 개념 이해
 6. Single Thread + Non-blocking I/O: JS의 동시성 핵심
 7. fetch / setTimeout / 이벤트 → 모두 Web API 기반 비동기 처리

 💬 결론:
 자바스크립트는 싱글 스레드지만,
 Web API + Callback Queue + Event Loop 구조를 이용해
 동시에 여러 작업을 "비동기적으로" 처리할 수 있다.
****************************************************************************************/
async function runAll() {
  const steps = [a, b, c, d, e, f];
  for (let i = 0; i < steps.length; i++) {
    console.log(`\n================ [${i + 1}] 단계 실행 =================`);
    steps[i]();
    // 각 함수 실행 후 3초 대기
    await new Promise((resolve) => setTimeout(resolve, 3500));
  }

  console.log("\n✅ 모든 예시 실행 완료!");
}

runAll();
