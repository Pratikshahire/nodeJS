console.log(arguments);

console.log(require('module').wrapper); //to see the wrapper


//module.exports
const C = require('./test-module-1');
const calc1 = new C;
console.log(calc1.add(10, 1));

//exports
// const calc2 = require('./test-module-2');
const { add, multiply, divide} = require('./test-module-2'); //ES6 destructuring

// console.log(calc2.add(2, 5));
console.log(multiply(2, 5));

//caching
require('./test-module-3')();
require('./test-module-3')(); //these 2 were cached....so hello from the module appears only once...
require('./test-module-3')();
