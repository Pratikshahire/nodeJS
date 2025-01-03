const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

//change the thread pool size
// process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => {
  console.log("timer 1 finished");
}, 0);

setImmediate(() => {
  console.log("Immediate 1 finished");
});

fs.readFile("test-file.txt", "utf-8", () => {
  console.log("io finished");

  console.log("--------------------------------");

  setTimeout(() => {
    console.log("timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("timer 3 finished");
  }, 3000);

  setImmediate(() => {
    console.log("Immediate 2 finished");
  });

  process.nextTick(() => {
    console.log("process.nextTick");
  });

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});

console.log("hello from the top level code");
