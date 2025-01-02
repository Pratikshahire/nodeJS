const fs = require('fs');

//blocking, synchronous way
// const textIn = fs.readFileSync('./text.txt', 'utf-8');
// console.log(textIn);

// const textOut = `this is waht we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./text1.txt', textOut);

// console.log('File written');

//non-blocking, asynchronous way

fs.readFile('./text1.txt', 'utf-8', (err, data) => {
    console.log(data);
});