const path = require('path');
const webpack = require('webpack');
const views = require('koa-views');
const serve = require('koa-static');
const convert = require('koa-convert');
const webpackDevMiddleware = require('webpack-dev-middleware');
const koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const app = require('./app.js');
const getapi = require('./api');
const config = require('../webpack/dev');
const port = process.env.ENV_PORT || 7060;

console.log('webpack building...');
const WebpkCompilers = webpack(config);
const { compilers } = WebpkCompilers;
const clientCompiler = compilers[0];

const koaDevware = (compiler, option) => {
    const middleware = webpackDevMiddleware(compiler, option);
    const koaMiddleware = async (ctx, next) => {
        await middleware(ctx.req, {
            end(content) {
                ctx.body = content;
            },
            setHeader() {
                ctx.set.apply(ctx, arguments);
            }
        }, next);
    }
    Object.keys(middleware).forEach(p => {
        koaMiddleware[p] = middleware[p];
    });
    return koaMiddleware;
}
app.use(getapi);
app.use(koaDevware(WebpkCompilers, {
    noInfo: false,
    serverSideRender: true,
    publicPath: clientCompiler.options.output.publicPath,
    stats: {
        colors: true
    },
    writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath)
    }
}));
app.use(convert(koaWebpackHotMiddleware(clientCompiler)));
app.use(views(path.resolve(__dirname, '../html/dev'), { map: { html: 'ejs' } }));
app.use(serve(path.resolve(__dirname, '../')));
app.use(webpackHotServerMiddleware(WebpkCompilers, {
    createHandler: webpackHotServerMiddleware.createKoaHandler,
    chunkName: 'server'
}));
let isBuilt = false;
WebpkCompilers.hooks.done.tap('start', () => {
    if (isBuilt) {
        return;
    }
    isBuilt = true;
    app.listen(port, () => {
        console.log(`Server started: http://localhost:${port}/`);
    });
});