import {React} from 'react';
import PropTypes from 'prop-types';

import './LeftBar.css';

const LeftBar = ({setContentType, userType, setContentType2}) => {

    const getOptions = (userType) => {
      switch (userType) {
        case 'Student':
          return [
            (<li style={{cursor: 'pointer'}} onClick={() => setContentType('enroll')} key='enroll'> Enroll </li>),
            (<li style={{cursor: 'pointer'}} onClick={() => setContentType('optionaldiscipline')} key='optionaldiscipline'> Optional </li>),
            (<li style={{cursor: 'pointer'}} onClick={() => setContentType('viewgrades')} key='viewgrades'> View Grades </li>)
          ]
        case 'Teacher':
          return [
            (<li style={{cursor: 'pointer'}} onClick={() => setContentType('addOptional')} key='addOptional'> Add Optional </li>),
            (<li style={{cursor: 'pointer'}} onClick={() => setContentType('assigngrades-disciplines')} key='assigngrades-disciplines'> Assign Grades </li>)
          ]
        case 'department-chief':
          return [
            (<li style={{cursor: 'pointer'}} onClick={() => setContentType('addOptional')} key='addOptional'> Add Optional </li>),
            (<li style={{cursor: 'pointer'}} onClick={() => setContentType('pendingOptionals')} key='pendingOptionals'> Pending Optionals </li>)
          ]
        default:
          console.log('leftbar error', userType);
          break;
      }
    }

    return (
      <div>
        <nav className="leftnavigation">
          <div className="left-navigation-menu">
              <ul>
                {getOptions(userType)}
              </ul>
          </div>
        </nav>
      </div>
   );
  }

  LeftBar.propTypes = {
    setContentType: PropTypes.func,
    setContentType2: PropTypes.func,
    userType: PropTypes.any
  }

  export {LeftBar};
