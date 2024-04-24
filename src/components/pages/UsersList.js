import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersList.css'; 
import Button from './Button';

const UsersList = () => {
  const Data_URL = 'http://localhost:5000/getData';
  const [users, setUsers] = useState([]);
  const [redactFormData, setRedactFormData] = useState({
    username: '',
    fieldToRedact: '',
    replacementText: ''
  });

  const [msg, setMsg] = useState('');
  const [msgState, setMsgState] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(Data_URL);
        if (response.status !== 200) {
          throw new Error('Failed to get users');
        }
        console.log(response.data);
        setUsers(response.data); 

      } catch (error) {
        console.error('Error getting users:', error);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Function to handle input change in the redact form
  const handleRedactFormChange = (event) => {
    const { name, value } = event.target;
    setRedactFormData({ ...redactFormData, [name]: value });
  };

  // Function to handle form submission for redaction
  const handleRedactFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if(redactFormData.fieldToRedact == 'name'){
        await axios.post('http://localhost:5000/redactUserName', redactFormData);
      } 
      else if(redactFormData.fieldToRedact == 'email'){
        await axios.post('http://localhost:5000/redactUserEmail', redactFormData);
      } 
      else if(redactFormData.fieldToRedact == 'password'){
        await axios.post('http://localhost:5000/redactUserPassword', redactFormData);
      } 
      else if(redactFormData.fieldToRedact == 'plan'){
        await axios.post('http://localhost:5000/redactUserPlan', redactFormData);
      } 
      else if(redactFormData.fieldToRedact == 'start_date'){
        await axios.post('http://localhost:5000/redactUserStartDate', redactFormData);
      } 
      else if(redactFormData.fieldToRedact == 'end_date'){
        await axios.post('http://localhost:5000/redactUserEndDate', redactFormData);
      } 
      else if(redactFormData.fieldToRedact == 'compleated_workouts'){
        await axios.post('http://localhost:5000/redactUserWorkouts', redactFormData);
      } 

      console.log('User information redacted:', redactFormData);
      setMsg('User redacted successfully!');
      setMsgState(false);
      

      setRedactFormData({ username: '', fieldToRedact: '', replacementText: '' });
    } catch (error) {
      console.error('Error redacting user information:', error);
      setMsg('User update failed! Try again...');
      setMsgState(true);
    }
  };

  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
             <>
                 <div className="btns2">
                    <a className='list-btn2' href='/addProfile'>Добави клиент</a>
                    <a className='log-out-btn4' onClick={logOut}>Излез</a>
                    </div>
    <div className="users-list-container">
      <div className='users-list-label-container'>
      <h2 className="users-list-label">Списък на клиентите</h2>

      </div>

      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <div className='column1'>
                 <span>
                <p>Име и фамилия: </p> 
                {user.username}</span>
              <span>
                <p>Ел. поща: </p>
                {user.email}</span>
              </div>
              <div className='column2'>
                <span>
                <p>Начална дата: </p>
                {formatDate(user.startDate)}</span>
              <span>
                 <p>Крайна дата: </p>
                {formatDate(user.endDate)}</span>
              </div>
              <div className='column3'>
              <span>
                <p>План: </p>
              {user.plan}</span>
              <span>
                <p>Направени тренировки: </p>
                {user.completedWorkouts}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="redact-form-container">
        <p className={msgState == true ? "errmsg" : "offscreen"} aria-live="assertive">{msg}</p>
        <p className={msgState == true ? "errmsg" : "offscreen"} aria-live="assertive">{msg}</p>
        <h3>Промени информация за клиент</h3>
        <form onSubmit={handleRedactFormSubmit}>
          <label htmlFor="username">Име и Фамилия:</label>
          <input type="text" id="username" name="username" value={redactFormData.username} onChange={handleRedactFormChange} />
          <label htmlFor="fieldToRedact">Поле за промяна:</label>
          <select id="fieldToRedact" name="fieldToRedact" value={redactFormData.fieldToRedact} onChange={handleRedactFormChange}>
            <option value="">Избери поле</option>
            <option value="name">Име и Фамилия</option>
            <option value="email">Ел.поща</option>
            <option value="password">Парола</option>
            <option value="plan">План</option>
            <option value="start_date">Начална дата</option>
            <option value="end_date">Крайна дата</option>
            <option value="compleated_workouts">Направени тренировки</option>
          </select>
          <label htmlFor="replacementText">Данни за промяна:</label>
          <input type="text" id="replacementText" name="replacementText" value={redactFormData.replacementText} onChange={handleRedactFormChange} />
          <button disabled={redactFormData.username == "" || redactFormData.fieldToRedact == "" || redactFormData.replacementText == "" ? true : false} type="submit">Промени</button>
        </form>
      </div>
    </div>
  </>
  );
};

export default UsersList;
