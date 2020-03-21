import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem>
                <span className="nav-link">Hello, {user.user.fullName}</span>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/add">Добавить продукт</NavLink>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Выйти</span>
            </NavItem>
        </Nav>
    );
};

export default UserMenu;
