import React, {Component} from 'react';
import {connect} from "react-redux";
import {Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

class Categories extends Component {
    render() {
        return (
            <div style={styles}>
                <Nav justified={true}>
                {this.props.categories.map(category =>
                        <NavItem key={category._id}>
                            <NavLink tag={RouterNavLink} to={`/${category._id}`}>{category.title}</NavLink>
                        </NavItem>

                )}
                </Nav>
            </div>
        );
    }
}
const styles = {
    width: '100%',
    background: 'lightgreen',
    marginTop: '100px',
    padding: '20px',
    color: 'white',
    opacity: '80%'
};

const mapStateToProps = state => ({
   categories : state.categories.categories
});

export default connect(mapStateToProps, null)(Categories);