import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.less';

const NavList = [{
    path: '/',
    title: '首页'
}, {
    path: '/list',
    title: '列表'
}];
const Header = () => {
    const linkNode = NavList.map((item, n) => {
        const key = `navlink_${n}`;
        return (
            <li className="m-header_li" key={key}>
                <NavLink exact to={item.path} className="m-header_link" activeClassName="m-header_sel">{item.title}</NavLink>
            </li>
        );
    });
    return (
        <nav className="m-header">
            <ul className="m-header_ul">
                {linkNode}
            </ul>
        </nav>
    );
};
export default Header;