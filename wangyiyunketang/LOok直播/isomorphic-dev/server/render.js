import path from 'path';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { Provider } from 'react-redux';
import createStore from '../client/store';
import AppRoutes from '../client/routes';



const getMod = comp => comp.default ? comp.default : comp;
export default async (matchRoute, ctx, next) => {
    const curComp = matchRoute[0].route.component;
    let realComp = await curComp.load();
    realComp = getMod(realComp);
    const store = createStore();
    // 请求接口
    if (realComp.getInitProps) {
        await realComp.getInitProps(store.dispatch, {
            host: `${ctx.protocol}://${ctx.host}`
        });
    }
    const webExtractor = new ChunkExtractor({
        statsFile: path.resolve(__dirname, '../public/loadable-stats.json'),
        entrypoints: ['app']
    });
    const context = {};
    const helmetContext = {};
    const jsx = webExtractor.collectChunks(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={context}>
                <HelmetProvider context={helmetContext}>
                    <AppRoutes />
                </HelmetProvider>
            </StaticRouter>
        </Provider>
    );
    const html = renderToString(jsx);
    const { helmet } = helmetContext;
    // 获取数据
    const state = store.getState();
    // console.log('=state=', state);
    await ctx.render('index', {
        title: helmet.title.toString(),
        root: html,
        link: webExtractor.getLinkTags(),
        style: webExtractor.getStyleTags(),
        script: webExtractor.getScriptTags(),
        state: JSON.stringify(state)
    });
}
