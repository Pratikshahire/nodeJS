//basic http server

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/overview') {
        res.end('This is the overview');
    }
    else if(pathName === '/product' || pathName === '/') {
        res.end('This is the product');
    }
    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-heaer': 'hello-world'
        });
        res.end('Page not found');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening at port 8000...');
})

