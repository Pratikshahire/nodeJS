const EventEmitter = require('events');
const http = require('http');

//inheritance
class Sales extends EventEmitter {
    constructor() { //syntax -> always
        super(); //makes all function of super class available to child class
    }
}

const myEmitter = new Sales();
myEmitter.on('newSale', () => {
    console.log("There was a new sale");
})

myEmitter.on('newSale', () => {
    console.log("customer name: Pratiksha");
})

myEmitter.on('newSale', (stock) => {
    console.log(`There are not ${stock} items left in stock.`);
})

myEmitter.emit('newSale', 9);

/////////////////


const server = http.createServer();

server.on('request', (req, res) => {
    console.log("request received");
    res.end("request received");
})

server.on('request', (req, res) => {
    console.log("Another request");
})

server.on('close', () => {
    console.log("server closed");
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Waiting for requests...");
})
