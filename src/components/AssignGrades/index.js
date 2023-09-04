import {React} from 'react';
import jwt_decode from "jwt-decode";
import './AssignGrades.css';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@mui/material';

const URL_DISCIPLINES = 'https://localhost:5001/api/discipline/lecturer/'
const URL_STUDENT='https://localhost:5001/api/student/course/'
const URL_GRADE='https://localhost:5001/api/teacher/grades/'

const ViewDisciplines = ({setContentType,setDisciplineId}) => {

    const userData = localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) : {};
    const teacherId = userData.id;
    const [disciplines, setDisciplines] = useState([]);

    const getDisciplinesPromise = () => {
      return fetch(URL_DISCIPLINES + teacherId).then(
       response =>
         response.json()
       ).catch((err) => console.log("no disciplines"))
      }

    const getAllData = () => {
        Promise.resolve(getDisciplinesPromise()).then(
        responses => {

            (responses!=undefined) ? setDisciplines([...(responses.map(discipline => {return {...discipline, key: discipline.courseId}}))]
            ) : console.log("Nothing");
        }
        ).catch((err) => {console.log(err)})
    }

    useEffect(() => {
        getAllData();
    }, []);
    const disciplineContainer = disciplines.map(
        (discipline) =>
        <div key={discipline.key} className="discipline-item">
            <div  className='a-g-discipline-title' onClick={() => {setContentType('assigngrades-students');setDisciplineId(discipline.courseId);}}>
              {discipline.courseName}
            </div>
        </div>
        );
    return (
      <>

      <div className="grades-card">
        <div className="container-card">
          <div className="content">
            {disciplineContainer}
          </div>
        </div>
      </div>
      </>
    );

}
ViewDisciplines.propTypes = {
    setId: PropTypes.func,
    setContentType: PropTypes.func

  }

const ViewStudents = ({setContentType, disciplineId}) => {
    const [students, setStudents] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    var URL_USED = URL_STUDENT + disciplineId;

    const getStudentsPromise = () => {
        return fetch(URL_USED).then(
         response =>
           response.json()
         ).catch((err) => console.log("no students"))
        }

    const getAllData = () => {
        Promise.resolve(getStudentsPromise()).then(
        responses => {
            (responses!=undefined) ? setStudents([...(responses.map(student => {return { value:student.id ,label:student.firstName+" "+student.lastName, key: student.id}}))]
            ) : console.log("Nothing");
        }
        ).catch((err) => {console.log(err)})
    }

    useEffect(() => {
        getAllData();
    }, []);

    const optionsGrades=[
        {value:1,label:1},
        {value:2,label:2},
        {value:3,label:3},
        {value:4,label:4},
        {value:5,label:5},
        {value:6,label:6},
        {value:7,label:7},
        {value:8,label:8},
        {value:9,label:9},
        {value:10,label:10}
    ]

    var selectedStudentId=0;
    var selectedGrade=0;

    function handleChoiceId(event){
        console.log(event.target.value);
        selectedStudentId=event.target.value;
    }
    function handleChoiceGrade(event){
        console.log(event.target.value);
        selectedGrade=event.target.value;
    }

    async function assignGrade() {
        console.log('discipline: ', disciplineId)
        console.log('studenID: ', selectedStudentId)
        console.log('grade: ', selectedGrade)

        const postInput = {
          courseId: disciplineId,
          studentId: selectedStudentId,
          value : selectedGrade
        }
        const response = await fetch(URL_GRADE, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(postInput)
        })
        await response.json();
      }

    return (
    <div className='assign-grades-container-2'>
        <div className='a-g-title'>Choose student and grade</div>
    <div className='choices-container'>
        <div className='a-g-select'>
            <select className='the-select' onChange={handleChoiceId}>

                {students.map(student => (
                <option value={student.value} label={student.label}></option>
                ))}
            </select>
        </div>
        <div className='a-g-select'>
            <select className='the-select' onChange={handleChoiceGrade}>
                {optionsGrades.map(grade => (
                <option value={grade.value} label={grade.label}></option>
              )).reverse()}
            </select>
        </div>
        </div>
        <div className='a-g-options'>
            {!isSubmited && <button className='a-g-do' onClick={() => {assignGrade(); setIsSubmited(true); setContentType('assigngrades-disciplines')}}>Assign</button>}
            <button color="error" className='a-g-Back' onClick={() => {setContentType('assigngrades-disciplines')}} >Back</button>
        </div>
    </div>
    )
}
ViewStudents.propTypes = {
    disciplineId: PropTypes.number,
    setContentType: PropTypes.func
  }


export{ViewDisciplines, ViewStudents}
