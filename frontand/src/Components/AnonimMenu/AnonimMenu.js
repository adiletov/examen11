import React, {Fragment} from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const AnonimMenu = () => (
    <Fragment>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/register">Регистрация</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/login">Войти</NavLink>
        </NavItem>
    </Fragment>
);

export default AnonimMenu;
