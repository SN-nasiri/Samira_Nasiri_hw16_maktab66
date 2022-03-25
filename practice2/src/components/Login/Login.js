import React, {useState} from 'react';
import Input from '../Input/Input';
import './Login.css'

const Login = (props) => {
    let [inputList, setInputList] = useState([
        {id: 0, name: 'email', type: 'email', placeholder: 'پست الکترونیک'},
        {id: 1, name: 'password', type: 'password', placeholder: 'کلمه عبور'}
    ])
    let [submit, setSubmit] = useState(false)
    let [valueSubmited, setValueSubmited] = useState({})
    let counter = 0

    let submitHandler = e => {
        e.preventDefault()
        setSubmit(true)
    }

    let checkUser = (name, value) => {
        counter ++
        let valueSubmited_copy = valueSubmited
        valueSubmited_copy[`${name}`] = value
        if (counter === inputList.length) {
            let filter = props.userList.filter(user => {
                return user.email === valueSubmited_copy.email &&
                        user.password === valueSubmited_copy.password
            })
            alert(filter.length !== 0 ? 'خوش آمدید !' : 'اطلاعات وارد شده نادرست است!')
        }
        setSubmit(false)
    }
    
    return (
        <div>
            <h2 className='form-header'>خوش آمدید</h2>
            <form className='form-login'>
                {inputList.map(input => {
                    return <Input 
                            input={input} 
                            key={input.id} 
                            submit={submit}
                            saveValue={value => checkUser(input.name, value)}/>})}
                <p className='forgot'>فراموش کردید؟</p>
                <button type='submit' className='submit' onClick={e => submitHandler(e)}>ورود</button>
            </form>
        </div>
    );
}

export default Login;
