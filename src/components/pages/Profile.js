import React, {useEffect, useState} from 'react';
import profile from '../../images/profile4.jpg';
import './Profile.css';
import Button from './Button';
import axios from 'axios';
import { useUserType } from '../UserTypeContext';

const Profile = () => {

const getUserInfo_URL = 'http://localhost:5000/getUserData';

     const handleClick = () => {
    localStorage.clear();
    window.location.href = '/';
  
};

 const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


const { userName } = useUserType();
const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = {username: userName};
        console.log(userName);
        const response = await axios.post(getUserInfo_URL, name);
        setUserData(response.data[0]); 
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <>
    <div className='profile-container'>
      <img src={profile} alt="Ne" className='profile-pic'/>
      <h1>{userData.username}</h1>
      <div className='info'>
      <h1>Абонаментен план:</h1>
      <h2>{userData.plan}</h2>
      <h1>Начална дата:</h1>
      <h2>{formatDate(userData.startDate)}</h2>
      <h1>Крайна дата:</h1>
      <h2>{formatDate(userData.endDate)}</h2>
      <h1>Направени тренировки:</h1>
      <h2>{userData.completedWorkouts}</h2>
      </div>
    </div>
    <div className='logout-btn'>
      <Button hrev='/' onClick={handleClick} label='Излез'></Button>
    </div>
    </>
  )
}

export default Profile