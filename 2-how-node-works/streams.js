const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1 -> loads the entire file inot memory to send data
    // fs.readFile('./test-file.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    ////solution 2 -> streams
    // const readable = fs.createReadStream('test-file.txt')
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found!");
    // })

    //solution 3 -> to handle problem of backpressure
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //readableSource.pipe(writeableDest)

});

server.listen(8000, '127.0.0.1', () => {
    console.log("listening...")
})

