import { matchRoutes } from 'react-router-config'
import routeConfig from '../client/routeconfig';
import render from './render';

const serverRoute = ({ clientStats, serverStats }) => {
    return async (ctx, next) => {
        // server router
        const { path } = ctx;
        const matchRoute = matchRoutes(routeConfig, path);
        if (matchRoute && matchRoute.length > 0) {
            await render(matchRoute, ctx, next);
        }
        await next();
    }
}
export default serverRoute;
