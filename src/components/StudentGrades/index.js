import {React} from 'react';
import './StudentGrades.css';
import jwt_decode from "jwt-decode";
import {useState, useEffect} from 'react';

const URL_REGULAR = 'https://localhost:5001/api/discipline/regular/student/'
const URL_OPTIONAL = 'https://localhost:5001/api/discipline/optional/student/'
const URL_GRADES = 'https://localhost:5001/api/student/grades/'

const StudentGrades = () => {
  const userData = localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) : {};
  const [disciplines, setDisciplines] = useState([]);
  const [optionalDiscipline, setOptionalDiscipline] = useState([]);
  const [grades,setGrades] = useState([]);
  const studentId=userData.id;

  const getGradesPromise = () => {
    return fetch(URL_GRADES + studentId).then(
      response => response.json()
    ).catch((err) => console.log("no grades"));
  }
  const getDisciplinesPromise = () => {
     return fetch(URL_REGULAR + studentId).then(
      response =>
        response.json()
      ).catch((err) => console.log("no regular"))
  }

  const getOptionalDisciplinePromise = () => {
    return fetch(URL_OPTIONAL + studentId).then(
     response =>
       response.json()
     ).catch((err) => console.log("no optional"))
  }

  const getAllData = () => {
    Promise.all([getGradesPromise(), getDisciplinesPromise(), getOptionalDisciplinePromise()]).then(
      responses => {
        console.log(responses);
        setGrades(responses[0].map(grade => {return {...grade, key: grade.courseId}}));
        setDisciplines([
            ...(responses[1].map(discipline => {return {...discipline, key: discipline.courseId}})),
            {...responses[2], key: responses[2]?.courseId}
          ]
        )
      }
    ).catch((err) => {console.log(err)})
  }

    useEffect(() => {
      getAllData();
    }, []);

    const disciplineContainer = disciplines.map(
      (discipline) =>
        <div key={discipline.key} className="discipline-line">
              <div className='discipline-title'>
                {discipline.courseName}
                :

              </div>
        </div>
    );
    const gradesContainer = disciplines.map(
      (discipline) =>
        <div key={discipline.key} className="grade-line">
                {
                    grades.some(grade => grade?.courseId === discipline?.courseId)
                    ?
                    grades.filter(grade => grade?.courseId === discipline?.courseId)
                      .map(grade => (<div className='grade-box' key={grade.key}> {grade.value} </div>))
                    : <div className='no-grade'>No grade at this discipline</div>
                }
              </div>

    );

    return (
      <>
        {
          gradesContainer.length === 0 ?
          <div className="no-grades-layout"><h1 className="no-grades"> no grades </h1></div>
          : (
            <div className='student-grades-container'>
              <div className="grades-title">Your grades</div>
              <div className='discipline-grades-container'>
                <div className='disciplines-container'>{disciplineContainer}</div>
                <div className='grades-container'>{gradesContainer}</div>
              </div>
            </div>
          )
        }
      </>
  );
}
export {StudentGrades};
