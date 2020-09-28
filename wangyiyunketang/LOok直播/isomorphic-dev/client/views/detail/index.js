import React, { useState, useCallback } from 'react';
import Send from './send';
import Notice from './notice';
import Gift from './gift';
import StaticGift from './staticgift';
import './index.less';

const Detail = (props) => {
    const { match } = props;
    console.log('=params=', match.params);
    return (
        <div className="m-detail">
            <div className="m-detail_fl">
                <div className="m-detail_vd">
                    视频
                </div>
                <Gift />
                <StaticGift />
            </div>
            <div className="m-detail_fr">
                <Notice />
                <Send />
            </div>
        </div>
    );
};
export default Detail;