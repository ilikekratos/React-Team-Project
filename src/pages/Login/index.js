import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import {Button, TextField, Card, CardContent, CardActionArea, CardActions, CardMedia, Typography, Alert} from '@mui/material';

import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Formik, Form, useFormikContext, useField} from 'formik';

import {Input} from '../../components/common/Input';
import './Login.css';

const URL = 'https://localhost:5001/api/login';

const Login = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState();
  const [passwordHelperText, setPasswordHelperText] = useState();
  const navigate = useNavigate();

  const submitLogin = (values) => {
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
      body: JSON.stringify({email: values.email, password: values.password})
    }).then(response => {
      if(response.ok){
        response.json()
          .then((data) => {
            localStorage.setItem('user-token', data.result.token);
            console.log("token", localStorage.getItem('user-token'));
            window.location.reload(false);
            navigate("/");
          })
          .catch((error) => setError(error.message))
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

    if(!values.email.trim()){
      errors.email = '*required*';
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'invalid format';
    }

    if(!values.password.trim()){
      errors.password = '*required*';
    }

    return errors;
  }

  return (
    <div style={{cursor: 'default'}} onClick={() => setError()} className="main-div">
      <h1 style={{marginBottom: "3px"}}>Login</h1>
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={validate}
          onSubmit={submitLogin}
        >
          {({errors}) =>
            <Form>
              <div className="form-container">
                <div className="form-input">
                  <AccountCircleIcon sx={{marginBottom: '20px'}} />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      error={!!errors.email}
                      name="email"
                      label="Email"
                      helperText={errors.email || emailHelperText}
                      onBlur={() => setEmailHelperText('nice mail 🤝')}
                      onFocus={() => setEmailHelperText('typing...')}
                      />
                  </div>
                </div>
                <div className="form-input">
                  <PasswordIcon sx={{marginBottom: '20px'}} />
                  <div className="textfield-container">
                    <Input
                      sx={{width: '250px', margin: '10px'}}
                      error={!!errors.password}
                      type="password"
                      name="password"
                      label="Password"
                      helperText={errors.password || passwordHelperText}
                      onBlur={() => setPasswordHelperText('nice password 🤫 🤓')}
                      onFocus={() => setPasswordHelperText('typing...')}
                    />
                  </div>
                </div>
                  <Button variant="contained" type='submit' sx={{width: '100px', marginBottom: '15px'}}>
                    {isLoading ? "loading..." : "submit"}
                  </Button>
              </div>
            </Form>
          }
        </Formik>
      </div>
      <h4>
        <a href="http://localhost:3000/register">
          Don't have an account?
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

const LoginCard = () => {
  return (
  <div className="login-card">
    <Card sx={{ width: 500 }} >
      <CardActionArea>
        <CardContent>
          <Login />
        </CardContent>
      </CardActionArea>
    </Card>
  </div>
  );
}

export {LoginCard};
