import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Form, FormGroup} from "reactstrap";

import FormElement from "../../Components/FormElement/FormElement";
import {registerUser} from "../../Store/Actions/actionUsers";


class Register extends Component {
    state = {
        fullName: '',
        phoneNumber: '',
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
        this.props.registerUser({...this.state});
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };

    render() {
        console.log(this.props.error)
        return (
            <Fragment>
                <h3 className="my-3 text-center">Sign up</h3>
                <div className="box user-form p-4">
                    {this.props.error && this.props.error.global && (
                        <Alert color="danger">
                            {this.props.error.global}
                        </Alert>
                    )}
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="fullName"
                            type="text"
                            value={this.state.fullName}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldHasError('fullName')}
                            placeholder="Your full name"
                            autoComplete="new-fullName"
                        />

                        <FormElement
                            propertyName="phoneNumber"
                            type="text"
                            value={this.state.phoneNumber}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldHasError('phoneNumber')}
                            placeholder="Your phone number"
                            autoComplete="new-phoneNumber"
                        />

                        <FormElement
                            propertyName="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldHasError('username')}
                            placeholder="Enter new username"
                            autoComplete="new-username"
                        />

                        <FormElement
                            propertyName="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldHasError('password')}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                        />

                        <FormGroup className="mb-0 mt-4">
                            <Button type="submit" color="info" className="w-100">Register</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: (user) => dispatch(registerUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
