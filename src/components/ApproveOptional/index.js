import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import jwt_decode from "jwt-decode";

import './ApproveOptional.css'

const DISCIPLINES_MOCK = [
  {key: 1, courseName: "ISS", courseSemester: 1, disciplineMean: 8.01, discriminator: 'Regular', lecturerFirstName: "John", lecturerLastName: "Monroe", lecturerId: 1, maxNumberStudents: 200},
  {key: 2, courseName: "ASC", courseSemester: 2, disciplineMean: 7.26, discriminator: 'Regular', lecturerFirstName: "Tom", lecturerLastName: "Depp", lecturerId: 2, maxNumberStudents: 124},
  {key: 3, courseName: "Networks", courseSemester: 2, disciplineMean: 9.02, discriminator: 'Regular', lecturerFirstName: "Jackie", lecturerLastName: "Lee", lecturerId: 3, maxNumberStudents: 123},
  {key: 4, courseName: "Web Programming", courseSemester: 1, disciplineMean: 6.49, discriminator: 'Regular', lecturerFirstName: "Bruce", lecturerLastName: "Bautista", lecturerId: 4, maxNumberStudents: 180},
  {key: 5, courseName: "Databases", courseSemester: 2, disciplineMean: 9.20, discriminator: 'Regular', lecturerFirstName: "Andrew", lecturerLastName: "DiCaprio", lecturerId: 5, maxNumberStudents: 178},
  {key: 6, courseName: "Algebra", courseSemester: 1, disciplineMean: 10, discriminator: 'Regular', lecturerFirstName: "Leonardo", lecturerLastName: "Bale", lecturerId: 6, maxNumberStudents: 110},
  {key: 7, courseName: "AI", courseSemester: 2, disciplineMean: 7.35, discriminator: 'Regular', lecturerFirstName: "Robert", lecturerLastName: "Reeves", lecturerId: 7, maxNumberStudents: 100},
]

const URL = 'https://localhost:5001/api/discipline'

const ApproveOptional = () => {
  const [proposedOptionals, setProposedOptionals] = useState([]);

  const userData = localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {};

  const getProposedOptionals = () => {
    fetch(URL).then(
      response =>
        response.json()
          .then(data => setProposedOptionals(data.map(discipline => {return {key: discipline.courseId, ...discipline}})))
      )
    .catch((err) => setProposedOptionals(DISCIPLINES_MOCK));
  }

  useEffect(() => {
    getDisciplines();
  }, []);

  const proposedOptionalCards = disciplines.map(
    (optional) =>
      <div key={optional.key} className="card-container">
         <div className="card">
            <div className='course-title'>{optional.courseName}</div>
            <div className='course-details'>
              <br></br>
              <div className='simple-row'>Semester: {optional.courseSemester}</div>
              <div className='simple-row'>Type: {optional.discriminator}</div>
              <div className='simple-row'>Lecturer: {optional.lecturerLastName} {optional.lecturerFirstName}</div>
            </div>
        </div>
      </div>
  );

  return (
    <div className="optional-list-container">
      {proposedOptionalCards}
    </div>
  );
}

export {ApproveOptional};
