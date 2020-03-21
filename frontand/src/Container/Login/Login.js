import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Form, FormGroup} from "reactstrap";


import FormElement from "../../Components/FormElement/FormElement";
import {loginUser} from "../../Store/Actions/actionUsers";

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state})
    };

    render() {
        return (
            <Fragment>
                <h3 className="my-3 text-center">Логин</h3>
                <div className="box user-form p-4">
                    {this.props.error && (
                        <Alert color="danger">
                            {this.props.error.message || this.props.error.global}
                        </Alert>
                    )}
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            placeholder="Имя пользователя"
                            autoComplete="current-username"
                        />

                        <FormElement
                            propertyName="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            placeholder="Пароль"
                            autoComplete="current-password"
                        />

                        <FormGroup className="mb-0 mt-4">
                            <Button type="submit" color="success" className="w-100">Войти</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    error: state.users.loginError,
    loginLoad: state.users.loginLoad
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user)=> dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
