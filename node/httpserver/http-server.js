const http = require('http');
http.createServer(function(req,res){
    console.log(req,res)
    res.end('123')
}).listen(3000,function(){
    console.log('启动了')
})