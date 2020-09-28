const Koa = require('koa');
const koalogger = require('koa-logger');
const session = require('koa-session');
const compress = require('koa-compress');
const convert = require('koa-convert');

const app = new Koa({
    proxy: true
});
app.keys = ['live'];
// 捕获错误
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.error('server err: %s', e);
        await ctx.render('index', {
            root: '',
            link: '',
            style: '',
            script: '',
            title: '',
            state: ''
        });
    }
});
app.use(convert(session(app)));
app.use(compress()); // 开启 gzip
app.use(koalogger()); // 终端输出日志
app.on('error', (err) => {
    console.error('from koa server error %s', err);
});
module.exports = app;
