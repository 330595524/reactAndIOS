const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
    constructor() {
        this.callbackFunc;
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }

    listen(...args) {
        let server = http.createServer(this.callback());
        server.listen(...args);
    }

    use(fn) {
        this.callbackFunc = fn;
    }

    callback() {
        return (req, res) => {
            let ctx = this.createContext(req, res);
            this.callbackFunc(ctx);
            this.responseBody(ctx);
        };
    }

    // 构造 ctx对象
    /**
     * 用于构造ctx
     * @param {Object} req   Node原生req实例
     * @param {Object} res  Node 原生res实例
     */
    createContext(req, res) {
        // 针对每一个请求
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;

        return ctx;
    }

    responseBody(ctx) {
        let content = ctx.body;
        if (typeof content === 'string') {
            ctx.res.end(content);
        } else if (typeof content === 'object') {
            ctx.res.end(JSON.stringify(content));
        }
    }
}

module.exports = Application;