import React, {Component} from 'react';
import './App.css';
import Header from "./Container/Header/Header";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Register from "./Container/Register/Register";
import Login from "./Container/Login/Login";
import {logoutUser} from "./Store/Actions/actionUsers";
import AddProduct from "./Components/AddProduct/AddProduct";
import {orderCategory} from "./Store/Actions/actionCategories";
import Products from "./Container/Products/Products";
import Categories from "./Container/Categories/Categories";


class App extends Component {
    componentDidMount() {
        this.props.orderCategories();
    }

    render() {
        return (
            <div className="App">
                <Header
                    user={this.props.user}
                    logout={this.props.logoutUser}
                />
                <div className='container'>
                    <Categories/>
                    <Switch>
                        <Route path="/" exact component={Products}/>
                        <Route path="/:id" exact component={Products}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/add" exact component={AddProduct}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser : () => dispatch(logoutUser()),
    orderCategories : () => dispatch(orderCategory())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
