import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "reactstrap";

import UserMenu from "../../Components/UserMenu/UserMenu";
import AnonimMenu from "../../Components/AnonimMenu/AnonimMenu";

const Header = ({user, logout}) => {
    return (
        <header>
            <Navbar color="success" dark expand="md">
                <NavbarBrand tag={RouterNavLink} to="/">Lalafo</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    {user ? <UserMenu user={user} logout={logout}/> : <AnonimMenu/>}
                </Nav>
            </Navbar>
        </header>
    );
};

export default Header;