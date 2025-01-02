//basic http server

const http = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);


const server = http.createServer((req, res) => {
    const pathName = req.url;

    const {query, pathname} = url.parse(req.url, true);

    //overview page
    if(pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {
            'content-type': 'text/html',
        });

        const cardsHtml = dataObject.map((element) => {
            return replaceTemplate(tempCard, element)
        }).join('');

        const output = tempOverview.replace('{%PRODUCTCARDS%}',cardsHtml);

        res.end(output);


        //product page
    }
    else if(pathname === '/product') {
        // console.log(query);

        const product = dataObject[query.id];
        res.writeHead(200, {
            'content-type': 'text/html',
        });
        const output = replaceTemplate(tempProduct, product);
        res.end(output);


        //api 
    }
    else if(pathname === '/api')
    {
        res.end(data);


        //not found
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

