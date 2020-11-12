const Koa = require('./lib/application');
const app = new Koa();

// app.use((req,res)=>{
//     res.writeHeader(200);
//     res.end('Hello world111');
// })

app.use(ctx=>{
    ctx.status = 404;
    ctx.body ='hello koa2222';
})
app.listen(3000,()=>{
    console.log('dddddd')
})