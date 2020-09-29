import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import './index.less';


const HomeIndex = (props) => {
    const { Home, dispatch } = props;
    const { data } = Home;
    const { text } = data || {};
    useEffect(() => {
        if (typeof data === 'undefined') {
            dispatch('home/fetch');
        }
    }, []);
    return (
        <div className="c-home">
            <Helmet>
                <title>{`我是${text}`}</title>
            </Helmet>
            <p>{`我是这个${text}`}</p>
        </div>
    );
};
HomeIndex.getInitProps = (dispatch, response) => dispatch('home/fetch', { response });
export default connect(({ home }) => ({ Home: home }))(HomeIndex);