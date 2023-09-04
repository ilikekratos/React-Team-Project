import {React, useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import { TopNavBar, LeftBar, YourProfile, Enroll,OptionalDiscipline, Disciplines, StudentGrades, ViewDisciplines, ViewStudents, AddOptional} from '../../components/';
import './HomePage.css';

function HomePage () {
    // profile, disciplines, enroll (student), add optional (teacher & dep chief), pending optionals (dep chief)
    const [contentType, setContentType] = useState('profile');
    const [userData, setUserData] = useState(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {});
    const [disciplineId, setDisciplineId] = useState('');

    useEffect(() => {
      setUserData(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {});
    }, []);

    const getContent = (contentType) => {
      switch (contentType) {
        case 'viewgrades':
          return <StudentGrades/>
        case 'disciplines':
          return <Disciplines />
        case 'enroll':
          return <Enroll />
        case 'profile':
          return <YourProfile />
        case 'optionaldiscipline':
          return <OptionalDiscipline />
        case 'assigngrades-disciplines':
          return <ViewDisciplines setContentType={setContentType} setDisciplineId={setDisciplineId}/>
        case 'assigngrades-students':
          return <ViewStudents setContentType={setContentType} disciplineId={disciplineId}/>
        case 'addOptional':
          return <AddOptional />
      }
    }

    return (
      <div className='home-body'>
        <TopNavBar setContentType={setContentType}/>
        <div className="horizontal-container">
          <LeftBar setContentType={setContentType} userType={userData.discriminator}/>
          <div className="content-container">
            {getContent(contentType)}
          </div>
        </div>
      </div>
  );
}
export {HomePage};
