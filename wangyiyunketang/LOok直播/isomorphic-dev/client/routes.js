import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './views/header';
import routeConfig from './routeconfig';

const Approutes = () => (
    <React.Fragment>
        <Header />
        <div className="m-cont">
            {renderRoutes(routeConfig)}
        </div>
    </React.Fragment>
);
export default Approutes;