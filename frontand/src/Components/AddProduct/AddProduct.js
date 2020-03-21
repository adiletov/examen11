import React, {Component} from 'react';
import {Button, Form} from "reactstrap";
import FormElement from "../FormElement/FormElement";
import {connect} from "react-redux";
import {addProduct} from "../../Store/Actions/actionProducts";

class ItemForm extends Component {
    state = {
        title: '',
        category: '',
        description: '',
        price: '',
        image: null,
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (this.state[key]) {
                formData.append(key, this.state[key]);
            }
        });

        this.props.addProduct(formData)
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="title"
                    title="Product title:"
                    type="text"
                    value={this.state.title}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('title')}
                />

                <FormElement
                    propertyName="category"
                    title="Category:"
                    type="select"
                    selectOptions={this.props.categories}
                    value={this.state.category}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('category')}
                />

                <FormElement
                    propertyName="price"
                    title="Price:"
                    type="number"
                    value={this.state.price}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('price')}
                />

                <FormElement
                    propertyName="description"
                    title="Description:"
                    type="textarea"
                    value={this.state.description}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('description')}
                />

                <FormElement
                    propertyName="image"
                    title="Image:"
                    type="file"
                    onChange={this.fileChangeHandler}
                    error={this.getFieldHasError('image')}
                />

                <Button type="submit" color="info">Add item</Button>

            </Form>
        );
    }
}
const mapStateToProps = state => ({
    error: state.products.error,
    categories: state.categories.categories
});
const mapDispatchToProps = dispatch => ({
    addProduct: (product) => dispatch(addProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
