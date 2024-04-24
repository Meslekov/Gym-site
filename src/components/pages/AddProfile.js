import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import './AddProfile.css';
import axios from 'axios'


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const addUser_URL = 'http://localhost:5000/addUser';

const AddProfile = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);
    const [userSurnameFocus, setUserSurnameFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const [plan, setPlan] = useState('');
    const [validPlan, setValidPlan] = useState(false);

    const [startDate, setStartDate] = useState('');

    const [endDate, setEndDate] = useState('');

    const [completedWorkouts, setCompletedWorkouts] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

     useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])


    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(USER_REGEX.test(surname));
    }, [surname])

    useEffect(() => {
        setValidPlan(plan != 'Избери план');
    }, [plan])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, surname, pwd, matchPwd])

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = USER_REGEX.test(name);
        const v3 = USER_REGEX.test(surname);
        const v4 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        try {
            const username = name + " " + surname; 
            const data = {username: username, email: email, password: pwd, plan: plan, startDate: startDate, endDate: endDate, completedWorkouts: completedWorkouts};
             const response = await axios.post(addUser_URL, data);
             console.log(response.data);
             console.log(JSON.stringify(response))
             setSuccess(true);
             //clear state and controlled inputs
             //need value attrib on inputs for this
             setName('');
             setSurname('');
             setPwd('');
             setMatchPwd('');
             setPlan('');
             setStartDate('');
             setEndDate('');
             setCompletedWorkouts('');
         } catch (err) {
             if (!err?.response) {
                 setErrMsg('No Server Response');
             } 
             if (err.response?.status === 409) {
                 setErrMsg("Email already taken");
             }
             else if (err.response?.status === 408) {
                 setErrMsg("Name already taken");
             }
              else {
                 setErrMsg('Registration Failed')
             }
             errRef.current.focus();
         }
    }

    const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

    return (
        <>
            {success ? (
                <section className="success">
                    <h1>Успешна регистрация на потребител!</h1>
                    <Button label='Регистрирай друг клиент' href='/addProfile'></Button>
                    <Button label='Отвори листа с клиенти' href='/usersList'></Button>
                </section>
            ) : (
                <>
                 <div className="btns">
                    <a className='list-btn' href='/usersList'>Списък с клиенти</a>
                    <a className='log-out-btn3' onClick={logOut}>Излез</a>
                    </div>
                <section className="register-sec">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Регистрирай потребител</h1>
                    <form className="onSubmit-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            Ел. поща:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                           <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Неправилна ел. поща!<br />
                            Пример: username@domainname.extension
                        </p>

                        <label htmlFor="username">
                            Име:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id="uidnote" className={usernameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> От
                            4 до 24 букви.<br />
                            Трябва да започва с главна буква.<br />
                            Букви, цифри и специални символи са позволени.
                        </p>

                           <label htmlFor="username">
                            Фамилия:
                            <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validSurname || !surname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setSurname(e.target.value)}
                            value={surname}
                            required
                            aria-invalid={validSurname ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserSurnameFocus(true)}
                            onBlur={() => setUserSurnameFocus(false)}
                        />
                        <p id="uidnote" className={userSurnameFocus && surname && !validSurname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            От
                            4 до 24 символа.<br />
                            Трябва да започва с главна буква.<br />
                            Букви, цифри и специални символи са позволени.
                        </p>

                        <label htmlFor="password">
                            Парола:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />От 
                            8 до 24 символа.<br />
                            Трябва да включва главна буква, малки букви, цифри и поне един специален символ.<br />
                            Позволени специални символи: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Повторете паролата:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                           Паролата трябва да съвпада.
                        </p>

      <div className="info">
        <label>План:</label>
        <select
         value={plan} 
         aria-invalid={validPlan ? "false" : "true"} 
         onChange={(e) => setPlan(e.target.value)}
         >
          <option value="Избери план">Избери план</option>
          <option value="12 тренировки/месец">12 тренировки/месец</option>
          <option value="16 тренировки/месец">16 тренировки/месец</option>
          <option value="Месечна карта">Месечна карта</option>
          <option value="Тримесечна карта">Тримесечна карта</option>
          <option value="Годишна карта">Годишна карта</option>
        </select>
      </div>
      <div className="info">
        <label>Начална дата:</label>
        <input 
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>
      <div className="info">
        <label>Крайна дата:</label>
        <input 
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div className="info">
        <label>Направени тренировки:</label>
        <input 
        type="number" 
        value={completedWorkouts} 
        onChange={(e) => setCompletedWorkouts(e.target.value)} />
      </div>


                        <button disabled={!validName || !validPwd || !validMatch || !validPlan || startDate == "" || endDate == "" || completedWorkouts <= 0 ? true : false}>Създай</button>
                    </form>
                </section>
                </>
            )}
        </>
    )
}

export default AddProfile
