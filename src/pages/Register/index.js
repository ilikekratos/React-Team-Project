import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import {Button, TextField, Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Alert} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import CreateIcon from '@mui/icons-material/Create';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {purple} from '@mui/material/colors';
import {Formik, Form, useFormikContext, useField} from 'formik';

import {Input} from '../../components/common/Input';
import './Register.css';

const URL = "https://localhost:5001/api/register";

const Register = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [firstNameHelper, setFirstNameHelper] = useState();
  const [lastNameHelper, setLastNameHelper] = useState();
  const [usernameHelper, setUsernameHelper] = useState();
  const [emailHelper, setEmailHelper] = useState('example@ctp.example.com');
  const [passwordHelper, setPasswordHelper] = useState();
  const [confirmPasswordHelper, setConfirmPasswordHelper] = useState();
  const [roleHelper, setRoleHelper] = useState('student / theacher / departament chief');
  const navigate = useNavigate();

  const submitRegister = (values) => {
    setIsLoading(true);
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        discriminator: values.role
      })
    })
    .then(response => {
      if(response.ok){
        response.json()
          .then(data => navigate("/login"))
          .catch(error => setError(error))
      }
      else {
        response.text().then(data => setError(data));
      }
    })
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false))
  }

  const validate = (values) => {
    const errors = {};

    if(!values.firstName.trim()){
      errors.firstName = '*required*';
    }

    if(!values.lastName.trim()){
      errors.lastName = '*required*';
    }

    if(!values.username.trim()){
      errors.username = '*required*';
    }

    if(!values.email.trim()){
      errors.email = '*required*';
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'invalid format';
    }

    if(!values.password.trim()){
      errors.password = '*required*';
    }

    if(!values.confirmPassword.trim()){
      errors.confirmPassword = '*required*';
    } else if (values.confirmPassword !== values.password){
      errors.confirmPassword = 'passwords don\'t match';
    }

    if(!values.role.trim()){
      errors.role = '*required*';
    } else if(
        values.role.toLowerCase() !== 'student'
        && values.role.toLowerCase() !== 'teacher'
        && values.role.toLowerCase() !== 'departament chief'
      ){
      errors.role = 'student / teacher / departament chief 😡 😡 😡'
    }

    return errors;
  }

  return (
    <div style={{cursor: 'default'}} onClick={() => setError()} className="main-div">
      <h1 style={{marginBottom: '10px'}}>Register</h1>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: ''
          }}
          onSubmit={submitRegister}
          validate={validate}
        >
          {({errors, touched, handleBlur}) =>
            <Form>
              <div className="form-container">
                <div className="form-input">
                  <CreateIcon />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      name="firstName"
                      label="First Name"
                      error={!!errors.firstName && touched.firstName}
                      helperText={touched.firstName && (errors.firstName || firstNameHelper)}
                      onBlur={(event) => {handleBlur(event); setFirstNameHelper('✅ ')}}
                      onFocus={(event) => {handleBlur(event); setFirstNameHelper('typing...')}}
                    />
                    </div>
                </div>
                <div className="form-input">
                  <CreateIcon />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      name="lastName"
                      label="Last Name"
                      error={!!errors.lastName && touched.lastName}
                      helperText={touched.lastName && (errors.lastName || lastNameHelper)}
                      onBlur={(event) => {handleBlur(event); setLastNameHelper('✅ ')}}
                      onFocus={(event) => {handleBlur(event); setLastNameHelper('typing...')}}
                    />
                  </div>
                </div>
                <div className="form-input">
                  <AccountCircleIcon />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      name="username"
                      label="Username"
                      error={!!errors.username && touched.username}
                      helperText={touched.username && (errors.username || usernameHelper)}
                      onBlur={(event) => {handleBlur(event); setUsernameHelper('sounds smart 😎')}}
                      onFocus={(event) => {handleBlur(event); setUsernameHelper('typing...')}}
                    />
                  </div>
                </div>
                <div className="form-input">
                  <AlternateEmailIcon />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      name="email"
                      label="Email"
                      error={!!errors.email && touched.email}
                      helperText={touched.email ? (errors.email || emailHelper) : emailHelper}
                      onBlur={(event) => {handleBlur(event); setEmailHelper('luckly it\'s not @yahoo.com')}}
                      onFocus={(event) => {handleBlur(event); setEmailHelper('typing...')}}
                    />
                  </div>
                </div>
                <div className="form-input">
                  <PasswordIcon />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      type="password"
                      name="password"
                      label="Password"
                      error={!!errors.password && touched.password}
                      helperText={touched.password && (errors.password || passwordHelper)}
                      onBlur={(event) => {handleBlur(event); setPasswordHelper('nice password 🤫 🤓')}}
                      onFocus={(event) => {handleBlur(event); setPasswordHelper('typing...')}}
                    />
                  </div>
                </div>
                <div className="form-input">
                  <PasswordIcon />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      error={!!errors.confirmPassword && touched.confirmPassword}
                      helperText={touched.confirmPassword && (errors.confirmPassword || confirmPasswordHelper)}
                      onBlur={(event) => {handleBlur(event); setConfirmPasswordHelper('matched ✅')}}
                      onFocus={(event) => {handleBlur(event); setConfirmPasswordHelper('matched ✅')}}
                    />
                  </div>
                </div>
                <div className="form-input">
                  <WorkIcon />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      name="role"
                      label="Role"
                      error={!!errors.role && touched.role}
                      helperText={touched.role ? (errors.role || roleHelper) : roleHelper}
                      onBlur={(event) => {handleBlur(event); setRoleHelper('✅ ')}}
                      onFocus={(event) => {handleBlur(event); setRoleHelper('✅')}}
                    />
                  </div>
                </div>
                <div className="form-input">
                  <Button variant="contained" type='submit' sx={{width: '100px', marginBottom: "15px", marginTop: "5px" }}>
                    {isLoading ? "loading..." : "submit"}
                  </Button>
                </div>
              </div>
            </Form>
          }
        </Formik>
      </div>
      <h4>
        <a href="http://localhost:3000/login">
          Already have an account?
        </a>
      </h4>
      {
        error &&
        <Alert sx={{marginTop: '20px', marginBottom: '5px'}} variant="filled" severity="error">
          {error}
        </Alert>
      }
    </div>
  );
}

const RegisterCard = () => {
  return (
  <div className="register-card" style={{ backgroundColor: purple }}>
    <Card sx={{ width: 500 }} >
      <CardActionArea>
        <CardContent>
          <Register />
        </CardContent>
      </CardActionArea>
    </Card>
  </div>
  );
}


export {RegisterCard};
