import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.less';

const ListIndex = (props) => {
    const { Livelist, dispatch } = props;
    const { data } = Livelist;
    const { list } = data || {};
    useEffect(() => {
        if (typeof data === 'undefined') {
            dispatch('list/fetch');
        }
    }, []);
    let listnode;
    if (list && list.length) {
        listnode = (
            <div>
                {
                    list.map((item, n) => {
                        const { id, title, anchor } = item;
                        const key = `list_${id}`;
                        return (
                            <Link to={`/detail/${id}`} className="m-list_li" key={key}>
                                <div className="m-list_tl">{title}</div>
                                <p className="m-list_autr">主播：{anchor}</p>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
    return (
        <div className="m-list">
            <Helmet>
                <title>我是列表</title>
            </Helmet>
            {listnode}
        </div>
    );
};
ListIndex.getInitProps = (dispatch, response) => dispatch('list/fetch', { response });
export default connect(({ list }) => ({ Livelist: list }))(ListIndex);