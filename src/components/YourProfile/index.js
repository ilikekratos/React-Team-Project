import {React, useState, useEffect} from 'react';
import './YourProfile.css';
import jwt_decode from "jwt-decode";
import {Formik, Form, useFormikContext, useField} from 'formik';
import {IconButton, Button, Alert} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import {Input} from '../common/Input';

const URL_INFOSTUDENT='https://localhost:5001/api/student/info/';
const URL_INFOTEACHER='https://localhost:5001/api/teacher/info/';
const URL_EDIT_USER='https://localhost:5001/api/user';

const YourProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  null)

  const getStudentPromise = () => {
    return fetch(URL_INFOSTUDENT + userToken.id)
    .then(
      response => response.json()
    ).catch((err) => console.log(error.message));
  }

  const getTeacherPromise = () => {
    return fetch(URL_INFOTEACHER + userToken.id)
    .then(
      response => response.json()
    ).catch((err) => console.log(error.message));
  }

  const getAllData = () => {
    if(userToken['discriminator'] === 'Teacher'){
      Promise.resolve(getTeacherPromise())
        .then(
          response => (response != undefined) ? setUserData(response) : console.log("Nothing")
        ).catch((err) => {console.log(err)})
    }
    else{
      Promise.resolve(getStudentPromise())
        .then(
          response => { setUserData(response); console.log('response', response)}
        ).catch((err) => {console.log(err)})
    }
  }
    useEffect(() => {
      getAllData();
    }, []);

    useEffect(() => {
      setUserToken(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  null);
    }, [isEditing])

    const submitEdit = (values) => {
      const userPostData = {
        id: parseInt(userToken.id),
        email: values.email.trim() || userToken.email,
        username: values.username.trim() || userData.userName,
        cnp: values.cnp.trim() || userData.cnp || null,
        hometown: values.hometown.trim() || userData.hometown || null,
        address: values.address.trim() || userData.address || null,
        discriminator: userToken.discriminator
      }
      console.log(userData)
      console.log("post", userPostData);
      setIsLoading(true);
      fetch(URL_EDIT_USER,  {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(userPostData)
      })
      .then(response => {
        if(response.ok){
          response.json()
            .then(data => {setSubmited(true); console.log("update", data) ; getAllData(); }).catch(error => setError(error.message))
        }
        else {
          response.text().then(data => setError(data));
        }
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false))
    }

    const validate = (values) => {
      const errors = {}

      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && values.email.trim()){
        errors.email = 'invalid format';
      }

      return errors;
    }

    return (
        <div className='myprofilebox'>
          <div className="profile-container">
          <div className='mytitleprofile'>
            Your profile
              <IconButton
                  onClick={() => {setIsEditing(!isEditing); setSubmited(false)}}
                  style={{marginLeft: '10px', marginBottom: '5px'}}
                  aria-label="edit"
              >
                <EditIcon />
              </IconButton>
            </div>
          <div className='details-container'>
            { isEditing
              ? (
                  <Formik
                    initialValues={{email: '', username: '', cnp: '', hometown: '', address: '' }}
                    onSubmit={submitEdit}
                    validate={validate}
                  >
                    {({errors}) =>
                      <Form>
                        <div onClick={() => setError()} className="form-container">
                          <div className="form-item">
                            <Input
                              name="cnp"
                              label="CNP"
                              error={!!errors.CNP}
                            />
                          </div>
                          <div className="form-item">
                            <Input
                              name="hometown"
                              label="Hometown"
                              error={!!errors.hometown}
                            />
                          </div>
                          <div className="form-item">
                            <Input
                              name="address"
                              label="Address"
                              error={!!errors.address}
                            />
                          </div>
                          <div className="form-item">
                            <Input
                              name="username"
                              label="Username"
                              error={!!errors.username}
                            />
                          </div>
                          <div className="form-item-email">
                            <Input
                              name="email"
                              label="Email"
                              error={!!errors.email}
                              helperText={errors?.email}
                            />
                          </div>
                          <div className="submit-button">
                            <Button className="submit-button" disabled={submited} variant="contained" type="submit" >
                              {submited ? 'Submited ✅' :  isLoading ? 'loading...' : 'submit'}
                            </Button>
                          </div>
                          {
                            error &&
                            <Alert sx={{marginTop: '20px', marginBottom: '5px'}} variant="filled" severity="error">
                              {error}
                            </Alert>
                          }
                        </div>
                      </Form>
                    }
                  </Formik>
              )
              : (
                  <div>
                    <div className='detail-row'>Name : {userData.firstName + " " + userData.lastName} </div>
                    <div className='detail-row'>Your Username : {userData.userName} </div>
                    <div className='detail-row'>Your Email : {userData.email} </div>
                    {userData?.cnp && <div className='detail-row'>Your CNP : {userData.cnp} </div>}
                    {userData?.hometown && <div className='detail-row'>Your Hometown : {userData.hometown} </div>}
                    {userData?.address && <div className='detail-row'>Your Address : {userData.address} </div>}
                  </div>
              )
            }
          </div>
          </div>
      </div>
  );
}
export {YourProfile};
