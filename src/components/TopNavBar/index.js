import {React} from 'react';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import {FaDoorOpen} from 'react-icons/fa';
import {FaHome} from 'react-icons/fa';
import "./TopNavBar.css";

const TopNavBar = ({setContentType}) => {

  const userData = localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) :  {};

  const logout = () => {
    localStorage.removeItem('user-token');
  }

  return (
    <div>
      <nav className="navigation">
      <a href="/" className="home"><FaHome className='homeicon'/> {`${userData?.discriminator || 'Student'} Home`} </a>
      <div className="navigation-menu">
        <ul>
          <li>
            <div style={{cursor: 'pointer'}} onClick={() => setContentType('profile')}>Your Profile</div>
          </li>
          <li>
            <div style={{cursor: 'pointer'}} onClick={() => setContentType('disciplines')}>Disciplines</div>
          </li>
          <li>
            <a href="/" onClick={logout}> <FaDoorOpen className='logicon'/> Logout </a>
          </li>
        </ul>
       </div>
     </nav>
   </div>
  );
}

TopNavBar.propTypes = {
  setContentType: PropTypes.func
}
export {TopNavBar};
