import React, {useState, memo, useEffect, useRef, useCallback} from 'react';
import './Select.css'

const Select = (props) => {
    let select = props.select
    let [change, setChange] = useState(false)
    let [error, setError] = useState(false)
    let refValue = useRef()

    useEffect(() => {
        if (props.submit) {
            let value = refValue.current.value
            props.saveValue(value)
            if (value === select.name && select.required) {
                setError(true)
            }
        }
    }, [props.submit])

    let changeHandler = useCallback(value => {
        switch(select.name) {
            case 'education': 
                props.eduPlaceShow(value === select.name ? false : true)
                break
            case 'province':
                let filter = select.options.filter(option => option.name === value)[0].options
                props.activePro(filter)
                break
        }   
    }, [change])

    return (
        <div className={`selectContainer ${error ? 'errorBorder' : 'unErrorBorder'}
        ${select.class}`}>
            <select name={select.name} 
                onChange={(e) => {setChange(true);changeHandler(e.target.value)}} ref={refValue}>
                <option value={select.name}>{select.text}</option>
                {select.options.map(option => {
                    return <option value={option.name} key={option.name}>{option.text}</option>})}
            </select>
            {props.children}
        </div>
    );
}

export default memo(Select);
