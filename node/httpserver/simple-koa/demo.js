const Koa = require('./lib/application');
const app = new Koa();

// app.use((req, res) => {
//     res.writeHeader(500);
//     res.end('Server Error');
// });

app.use(ctx => {
    ctx.status = 404;
    ctx.body = 'hello Koa!';
});

app.listen(3000, () => {
    console.log('hello Simple Koa');
});