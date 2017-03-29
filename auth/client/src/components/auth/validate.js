import React from 'react'


const validate= values => {
    console.log(values)
  const errors = {}

  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
      errors.password = "Please enter the password"
  }

  if (!values.passwordConfirm) {
      errors.password = "Please confirm the password"
  }

  if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Passwords are not equal'
  }

  return errors
}

export default validate;