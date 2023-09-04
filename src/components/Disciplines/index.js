import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import jwt_decode from "jwt-decode";

import './Disciplines.css'

const DISCIPLINES_MOCK = [
  {key: 1, courseName: "ISS", semester: 1, disciplineMean: 8.01, discriminator: 'Regular', lecturerFirstName: "John", lecturerLastName: "Monroe", lecturerId: 1, maxNumberStudents: 200},
  {key: 2, courseName: "ASC", semester: 2, disciplineMean: 7.26, discriminator: 'Regular', lecturerFirstName: "Tom", lecturerLastName: "Depp", lecturerId: 2, maxNumberStudents: 124},
  {key: 3, courseName: "Networks", semester: 2, disciplineMean: 9.02, discriminator: 'Regular', lecturerFirstName: "Jackie", lecturerLastName: "Lee", lecturerId: 3, maxNumberStudents: 123},
  {key: 4, courseName: "Web Programming", semester: 1, disciplineMean: 6.49, discriminator: 'Regular', lecturerFirstName: "Bruce", lecturerLastName: "Bautista", lecturerId: 4, maxNumberStudents: 180},
  {key: 5, courseName: "Databases", semester: 2, disciplineMean: 9.20, discriminator: 'Regular', lecturerFirstName: "Andrew", lecturerLastName: "DiCaprio", lecturerId: 5, maxNumberStudents: 178},
  {key: 6, courseName: "Algebra", semester: 1, disciplineMean: 10, discriminator: 'Regular', lecturerFirstName: "Leonardo", lecturerLastName: "Bale", lecturerId: 6, maxNumberStudents: 110},
  {key: 7, courseName: "AI", semester: 2, disciplineMean: 7.35, discriminator: 'Regular', lecturerFirstName: "Robert", lecturerLastName: "Reeves", lecturerId: 7, maxNumberStudents: 100},
]

const URL_REGULAR = 'https://localhost:5001/api/discipline/regular/student/';
const URL_OPTIONAL = 'https://localhost:5001/api/discipline/optional/student/';
const URL_TEACHER = 'https://localhost:5001/api/discipline/lecturer/';

const Disciplines = () => {
  const [disciplines, setDisciplines] = useState([]);
  const userData = localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {};

  const getDisciplinesTeacher = () =>{
    return fetch(URL_TEACHER + userData.id).then(
      response =>
        response.json()
      ).catch((err) => console.log("no teacher"))
  }

    const getDisciplinesPromise = () => {
      return fetch(URL_REGULAR + userData.id).then(
      response =>
        response.json()
      ).catch((err) => console.log("no regular"))
      }

    const getOptionalDisciplinePromise = () => {
      return fetch(URL_OPTIONAL + userData.id).then(
        response =>
          response.json()
        ).catch((err) => console.log("no optional"))
    }

    const getAllData = () => {
      if(userData['discriminator'] === 'Student'){
        Promise.all([getDisciplinesPromise(), getOptionalDisciplinePromise()])
          .then(
            responses => {
              const disciplineList = [...(responses[0].map(discipline => {return {...discipline,discriminator:'regular', key: discipline.courseId}}))];

              if(responses[1]){
                disciplineList.push({...responses[1], discriminator:'optional', key: responses[1].courseId});
              }

              setDisciplines(disciplineList);
            }
          ).catch((err) => {console.log(err)})
      }
      else{
        Promise.resolve(getDisciplinesTeacher())
          .then(
            responses =>
              (responses!=undefined)
                ? setDisciplines([...(responses.map(discipline => {return {...discipline, key: discipline.courseId}}))])
                : console.log("Nothing")
          ).catch((err) => {console.log(err)})
      }
    }
    useEffect(() => {
      getAllData();
    }, []);

  const disciplineCards = disciplines.map(
    (discipline) =>
      {
        return (
          <div key={discipline.key} className="card-container">
             <div
               style={discipline.discriminator === 'Optional'
               ? {backgroundColor: '#EE8434', color: 'white'}
               : {backgroundColor: 'white', color: 'black'}}
               className="card"
             >
                <div className='course-title'>{discipline?.courseName}</div>
                <div className='course-details'>
                  <br></br>
                  <div className='simple-row'>Semester: {discipline?.semester}</div>
                  <div className='simple-row'>Type: {discipline?.discriminator}</div>
                  <div className='simple-row'>Lecturer: {discipline?.lecturerLastName} {discipline?.lecturerFirstName}</div>
                </div>
            </div>
          </div>
        )
    }
  );

  return (
    <div className="discipline-list-container">
      {
        disciplineCards.length > 0
        ? disciplineCards
        : (
            <div className='no-card'>
              <h1> You don't have disciplines assigned</h1>
            </div>
        )
      }
    </div>
  );
}

export {Disciplines};
