import { React ,useState,useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button'
import jwt_decode from "jwt-decode";
import './Enroll.css';

const URL_FACULTY="https://localhost:5001/api/faculty";
const URL_FACULTYDEPARTMENT="https://localhost:5001/api/faculty/department/"
const URL_STUDYLINES="https://localhost:5001/api/faculty/studyline/"
const URL_YEAR="https://localhost:5001/api/faculty/yearofstudy/"
const URL_ENROLL='https://localhost:5001/api/enrollement'
const userData = localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {};

const Enroll = () => {
  var firstSelectedFaculty=1;
  var firstSelectedYear=1;
  var studentId=parseInt(userData.id,10);

  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [studylines, setStudyLines] = useState([]);
  const [years, setYears] = useState([]);
  const [isSubmited, setIsSubmited] = useState(localStorage.getItem('enrolled') || false);

  const getFacultiesPromise = () => {
    return fetch(URL_FACULTY).then(
     response =>
       response.json()
     ).catch((err) => console.log("no faculties"))
    }
    const getDepartmentPromise = (id) => {
      return fetch(URL_FACULTYDEPARTMENT+id).then(
       response =>
         response.json()
       ).catch((err) => console.log("no departments"))
      }
    const getStudyLinesPromise =(id)=>{
      return fetch(URL_STUDYLINES+id).then(
        response =>
          response.json()
        ).catch((err) => console.log("no study lines"))
    }
    const getYearsPromise =(id)=>{
      return fetch(URL_YEAR+id).then(
        response =>
          response.json()
        ).catch((err) => console.log("no years"))
    }


    const getFaculties = () => {
      Promise.resolve(getFacultiesPromise()).then(
      responses => {

          (responses!=undefined) ? setFaculties([...(responses.map(faculty => {return { value:faculty.facultyId ,label:faculty.facultyName, key: faculty.facultyId}}))]
          ) : console.log("Nothing");
      }
      ).catch((err) => {console.log(err)})
    }
    const getDepartments =(id)=>{
      Promise.resolve(getDepartmentPromise(id)).then(
        responses => {

            (responses!=undefined) ? setDepartments([...(responses.map(department => {return { value:department.departmentId ,label:department.departmentName, key: department.departmentId}}))]
            ) : console.log("Nothing");
        }
        ).catch((err) => {console.log(err)})
  }
  const getStudyLines =(id)=>{
    Promise.resolve(getStudyLinesPromise(id)).then(
      responses => {

          (responses!=undefined) ? setStudyLines([...(responses.map(studyline => {return { value:studyline.studyLineId ,label:studyline.studyLineName, key: studyline.studyLineId}}))]
          ) : console.log("Nothing");
      }
      ).catch((err) => {console.log(err)})
  }

  const getYears =(id)=>{
    Promise.resolve(getYearsPromise(id)).then(
      responses => {

          (responses!=undefined) ? setYears([...(responses.map(year => {return { value:year.yearOfStudyId ,label:"Year "+year.yearNumber, key: year.yearOfStudyId}}))]
          ) : console.log("Nothing");
      }
      ).catch((err) => {console.log(err)})
  }

  async function firstEnroll() {
    const postEnroll = {
      studentId: studentId,
      yearOfStudyId: firstSelectedYear,
    }

    const response = await fetch(URL_ENROLL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(postEnroll)
    })
    response.json().then(response => {
      localStorage.setItem('enrolled', true);
      setIsSubmited(true);
    });
  }

  useEffect(() => {
    getFaculties();
    getDepartments(firstSelectedFaculty);
    getStudyLines(firstSelectedFaculty);
    getYears(firstSelectedFaculty);
    setIsSubmited(localStorage.getItem('enrolled'))
  }, []);

  useEffect(() => {

  }, [])

  function handleFacultyChange(event){
    firstSelectedFaculty=event.target.value;
    getDepartments(firstSelectedFaculty);
    getStudyLines(firstSelectedFaculty);
    getYears(firstSelectedFaculty);
  }
  function handleYear(event){
    firstSelectedYear=event.target.value;
  }
    return (
        <div className='myoptioncontainer'>
            <div className='myoption'>
              <div className="content">
                <div className='titlediv1'><h1 className='mytitle'>Choose first option for year of study</h1></div>
                  <div className='selectFaculty'>
                  <FormControl fullWidth>
                    <NativeSelect
                      defaultValue={1}
                      inputProps={{
                        name: 'faculty',
                        id: 'uncontrolled-native',
                      }} onChange={handleFacultyChange}
                    >
                    {faculties.map(faculty => (
                    <option value={faculty.value} label={faculty.label} ></option>
                    ))}
                    </NativeSelect>
                  </FormControl>
                  </div>
                  <div className='selectDepartment'>
                  <FormControl fullWidth>

                    <NativeSelect
                      defaultValue={1}
                      inputProps={{
                        name: 'department',
                        id: 'uncontrolled-native',
                      }}
                    >
                    {departments.map(deparment => (
                    <option value={deparment.value} label={deparment.label} ></option>
                    ))}
                    </NativeSelect>
                  </FormControl>
                  </div>
                  <div className='selectLine'>
                  <FormControl fullWidth>

                    <NativeSelect
                      defaultValue={1}
                      inputProps={{
                        name: 'line',
                        id: 'uncontrolled-native',
                      }}
                    >
                    {studylines.map(studyline => (
                    <option value={studyline.value} label={studyline.label} ></option>
                    ))}
                    </NativeSelect>
                  </FormControl>
                  </div>
                  <div className='selectYear'>
                  <FormControl fullWidth>
                    <NativeSelect
                      defaultValue={1}
                      inputProps={{
                        name: 'faculty',
                        id: 'uncontrolled-native',
                      }}
                    onChange={handleYear}>
                    {years.map(year => (
                    <option value={year.value} label={year.label} ></option>
                    ))}

                    </NativeSelect>
                  </FormControl>
                    <Button disabled={isSubmited} className="submitOptionButton" variant="contained" type='submit' sx={{width: '130px', marginBottom: '15px'}} onClick={firstEnroll}>
                        {isSubmited ? 'Enrolled ✅' : 'Enroll'}
                    </Button>
                  </div>
                </div>
            </div>
    </div>

  );

  }
  export {Enroll};
