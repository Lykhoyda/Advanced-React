import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import *  as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit = (values) => {
        const { email, password } = values;

        this.props.signInUser({ email, password });
    }

    renderAlert = () => {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{this.props.errorMessage}
                </div>
            )
        }
    }
    
    render () {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" className="form-control" component="input" type="text"/>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" className="form-control" component="input" type="password"/>
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
}


const formSettings = {
    form: 'signin'
}

const enhance = compose (
    connect(mapStateToProps, actions),
    reduxForm(formSettings)
)

export default enhance(Signin);