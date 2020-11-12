const Koa = require('koa');
const app = new Koa();

app.use((req,res) => {
    // 
});

app.listen(3000,() => {
    console.log('服务启动成功！');
});