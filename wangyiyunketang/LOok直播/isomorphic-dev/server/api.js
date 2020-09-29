const helper = require('./helper'); 
// 模拟 api
const api =  async (ctx, next) => {
    const { path } = ctx;
    const paths = path.slice(1).split('/');
    // api 服务
    if (paths[0] === 'api') {
        if (path === '/api/gethome') {
            ctx.body = helper.createResponse({
                text: '首页'
            });
        } else if (path === '/api/getlist') {
            ctx.body = helper.createResponse({
                list: [{
                    id: 1,
                    title: '直播间1',
                    anchor: '主播1'
                }, {
                    id: 2,
                    title: '直播间2',
                    anchor: '主播2'
                }]
            });
        }
        return;
    }
    await next();
}
module.exports = api;