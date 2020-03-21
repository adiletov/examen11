import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";

const FormElement = props => {
    return (
        <FormGroup>
            {props.title && <Label for={props.propertyName}>{props.title}</Label>}
            <Input
                type={props.type}
                id={props.propertyName}
                name={props.propertyName}
                value={props.value}
                invalid={!!props.error}
                onChange={props.onChange}
                required={props.required}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
            >
                {props.selectOptions
                    ?   <Fragment>
                        <option value="">Выберите категорию</option>
                        {props.selectOptions.map(option => (
                            <option key={option._id} value={option._id}>{option.title}</option>
                        ))}
                    </Fragment>
                    :   null
                }
            </Input>
            {props.error && (
                <FormFeedback>
                    {props.error}
                </FormFeedback>
            )}
        </FormGroup>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    selectOptions: PropTypes.array,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string
};

export default FormElement;
