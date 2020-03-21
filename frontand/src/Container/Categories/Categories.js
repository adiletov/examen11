import React, {Component} from 'react';
import {connect} from "react-redux";
import {Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

class Categories extends Component {
    render() {
        return (
            <div style={styles}>
                <Nav justified={true}>
                    <NavItem>
                        <NavLink tag={RouterNavLink} to='/'>Все</NavLink>
                    </NavItem>
                {this.props.categories.map(category =>
                        <NavItem key={category._id}>
                            <NavLink tag={RouterNavLink} to={`/products/${category._id}`}>{category.title}</NavLink>
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
    marginBottom: '20px',
    padding: '20px',
    color: 'white',
    opacity: '80%'
};

const mapStateToProps = state => ({
   categories : state.categories.categories
});

export default connect(mapStateToProps, null)(Categories);