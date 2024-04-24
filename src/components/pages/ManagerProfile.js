import React from 'react';
import Button from './Button';
import './ManagerProfile.css';


const ManagerProfile = () => {

      const handleClick = () => {
    localStorage.clear();
    window.location.href = '/';
  
};

      return (
        <div className='container'>
        <div className="manager-profile-container">
          <Button href='/addProfile' label="Добави клиент"></Button>
          <Button href='/usersList' label="Списък с клиенти"></Button>
        </div>
        <div className="manager-profile-logOut-container">
          <Button onClick={handleClick} label="Излез"></Button>
        </div>
        </div>
    );
}

export default ManagerProfile


