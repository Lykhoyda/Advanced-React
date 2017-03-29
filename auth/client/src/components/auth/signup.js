import React, { Component } from 'react';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import validate from './validate';


const renderField = ({ input, label, name, type, meta: { touched, error } }) => (
    <fieldset className="form-group">
        <label htmlFor={name}>{label}:</label>
        <div>
            <input {...input} id={name} placeholder={label} type={type} className="form-control" />
            {touched && ((error && <span className="text-danger">{error}</span>))}
        </div>
    </fieldset>
);

class Signup extends Component {

    formSend = (values) => {
        this.props.signupUser(values);
    }

    renderAlert = () => {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render () {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.formSend) }>
                <Field name="email" component={renderField} label="Email" type="text"/>
                <Field name="password" component={renderField} label="Password" type="password"/>
                <Field name="passwordConfirm"  component={renderField} label="Confirm Password" type="password"/>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
}

const formSettings = {
    form: 'signup',
    validate
}

const enhance = compose (
    connect(mapStateToProps, actions),
    reduxForm(formSettings)
)
 
export default enhance(Signup);