import React, {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {Formik, Form, useFormikContext, useField} from 'formik';
import {Button, TextField, Card, CardContent, CardActionArea, CardActions, CardMedia, Typography, Alert} from '@mui/material';

import {Input} from '../common/Input';
import './AddOptional.css';

const URL = 'https://localhost:5001/api/teacher/propose-optional';
const DISCIPLINES_URL = 'https://localhost:5001/api/discipline/lecturer'

const AddOptional = () => {

  const [userData, setUserData] = useState(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {});
  const [submited, setSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    checkDisciplines();
    setUserData(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {});
  }, []);

  const checkDisciplines = () => {
    fetch(DISCIPLINES_URL + "/" + userData.id)
      .then(response =>
        response.json()
          .then(data => {
            if(data.filter(data => data.discriminator === 'Optional').length > 1){
              setForbidden(true);
            }
          })
          .catch(error => console.log('error', error))
      )
      .catch(error => console.log('2error', error))
  }

  const submitForm = (values) => {
    setIsLoading(true);
    console.log(values, '++', userData.id);
    const postData = {
      teacherId: userData.id,
      courseName: values.courseName,
      semester: values.semester,
    }

    fetch(URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(postData)
      }).then(response => {
      if(response.ok){
        response.json()
        .then((data) => {
          console.log(data);
          setSubmited(true);
        })
        .catch((error) => console.log(error))
      }
      else {
        response.text().then(data => console.log(data));
      }
    })
    .catch(error => console.log(data))
    .finally(() => setIsLoading(false))
  }

  const validate = (values) => {
    const errors = {};

    if(!values.courseName.trim()){
      errors.courseName = '*required*';
    }

    if(!values.semester.trim()){
      errors.semester = '*required*';
    } else if(!/^-?\d+$/.test(values.semester)){
      errors.semester = 'please insert a number';
    }
    // todo: check nr of semester (max number)
    return errors;
  }

  return (
    <div className="box">
      <h1> Add an Optional Discipline </h1>
      <Formik
        initialValues={{courseName: '', semester: ''}}
        onSubmit={submitForm}
        validate={validate}
      >
        {({errors}) =>
          <Form>
            <div className='form-container'>
              <div className="textfield-container">
                <Input
                  sx={{width: '250px', marginTop: '30px'}}
                  name="courseName"
                  label="Course Name"
                  error={!!errors.courseName}
                  helperText={errors?.courseName}
                  disabled={forbidden}
                />
              </div>
              <div className="textfield-container">
                <Input
                  sx={{width: '250px', margin: '30px'}}
                  name="semester"
                  label="Course Semester"
                  error={!!errors.semester}
                  helperText={errors?.semester}
                  disabled={forbidden}
                />
              </div>
              <Button disabled={submited || isLoading || forbidden} variant="contained" type='submit' sx={{width: forbidden ? '400px' : '150px', marginTop: '25px'}}>
                { forbidden ? 'You have already added 2 optionals' : isLoading ? 'loading...' : submited ? 'Submited ✅' : 'submit'}
              </Button>
            </div>
          </Form>
        }
      </Formik>
     </div>
  );

}

export {AddOptional};
