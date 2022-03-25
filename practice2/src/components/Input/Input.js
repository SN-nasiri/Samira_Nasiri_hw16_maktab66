import React, {useState, useCallback, memo, useRef, useEffect} from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import './Input.css'

const Input = (props) => {
    let input = props.input
    let [showPassword, setShowPassword] = useState(false)
    let [error, setError] = useState(false)
    let refValue = useRef()
    const passwordHandler = useCallback(() => setShowPassword(!showPassword))

    useEffect(() => {
        if (props.submit) {
            let value = refValue.current.value
            props.saveValue(value)
            if (value.length === 0 && input.required) {
                setError(true)
            }
        }
    }, [props.submit])

    return (
        <div className={`inputCountainer ${input.class}
            ${error ? 'errorBorder' : 'unErrorBorder'}`}>
            <input 
                name={input.name}
                type={input.type !== 'password' ? input.type :
                        showPassword ? 'text' : 'password'}
                placeholder={`* ${input.placeholder}`}
                ref={refValue}>
            </input>
            {input.name !== 'password' ? '' :
                showPassword ? 
                <BsFillEyeFill className='stylePass' onClick={passwordHandler}/> :
                <BsFillEyeSlashFill className='stylePass' onClick={passwordHandler}/>}
        </div>
    );
}

export default memo(Input);
