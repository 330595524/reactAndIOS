const http = require('http');
http.createServer((req, res) => {
    res.writeHeader(200);
    res.end('hello world!');
}).listen(3000, () => {
    console.log('服务启动成功！');
});