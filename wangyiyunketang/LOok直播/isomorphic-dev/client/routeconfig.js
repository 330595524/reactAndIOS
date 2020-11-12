import React from 'react';
import baseLoadable from '@loadable/component';

const Loading = () => (
    <div className="m-loading">加载中...</div>
);
const loadable = loader => baseLoadable(loader, {
    fallback: <Loading />
});
const Home = loadable(() => import('./views/home'));
const List = loadable(() => import('./views/list'));
const Detail = loadable(() => import('./views/detail'));

const config = [
    {
        path: '/list',
        exact: true,
        component: List
    },
    {
        path: '/detail/:id',
        exact: true,
        component: Detail
    },
    {
        path: '/',
        exact: true,
        component: Home
    }
];
export default config;