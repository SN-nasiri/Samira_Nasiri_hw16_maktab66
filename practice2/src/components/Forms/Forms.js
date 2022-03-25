import React, {useState} from 'react';
import './Forms.css'
import Login from "../Login/Login";
import Register from "../Register/Register";

const Forms = () => {
    let [login, setLogin] = useState(true)
    let [userList, setUserList] = useState([])

    return (
        <div className='Forms'>
            <div className='Forms-btns'>
                <button 
                    className={`F-btn ${login ? 'active' : ''}`}
                    onClick={() => setLogin(!login)}>ورود
                </button>
                <button 
                    className={`F-btn ${login ? '' : 'active'}`}
                    onClick={() => setLogin(!login)}>ثبت نام
                </button>
            </div>
            {login ? <Login userList={userList}/> : 
            <Register saveUser={user => setUserList([...userList, user])}/>}
        </div>
    );
}

export default Forms;
