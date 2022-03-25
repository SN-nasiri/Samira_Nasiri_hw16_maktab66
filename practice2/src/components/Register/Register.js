import React, {useState, useEffect, useCallback} from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';
import './Register.css'

const Register = (props) => {
    let [inputList, setInputList] = useState([
        {id: 0, name: 'name', type: 'text', placeholder: 'نام', class: 'width_50', required: true},
        {id: 1, name: 'family', type: 'text', placeholder: 'نام خانوادگی', class: 'width_50', required: true},
        {id: 2, name: 'email', type: 'email', placeholder: 'پست الکترونیک', required: true},
        {id: 3, name: 'password', type: 'password', placeholder: 'کلمه عبور', required: true}
    ])
    let [selectList, setSelectList] = useState([
        {id: 0, name: 'education', text:'تحصیلات', required: false, options: [
            {name:'diploma', text: 'دیپلم'}, 
            {name:'associate', text: 'کاردانی'}, 
            {name:'expert', text: 'کارشناسی'}, 
            {name:'senior', text: 'کارشناسی ارشد'}, 
            {name:'PHD', text: 'دکترا'}], 
            input: {name: 'eduPlace', type: 'text', placeholder: 'محل تحصیل', class: 'width_50 distances', required: true}}
    ])
    let [eduPlaceShow, setEduPlaceShow] = useState(false)
    let [activePro, setActivePro] = useState(
        {name: 'city', text: 'شهرستان', class: 'width_50 distances', required: true, options:[]})
    let [submit, setSubmit] = useState(false)
    let [valueSubmited, setValueSubmited] = useState({})
    let flag = false

    async function getProvince() {
        let province = {id:1, name:'province', text: 'استان', required: true, options: []}
        let province_json = await fetch('./json/iranstates.json').then(res => res.json())
        Object.entries(province_json).map((key, value) => {
            let cities = key[1].map(city => {
                return {name: city, text: city}
            })
            province.options.push({name: key[0], text: key[0], options: cities})})
        setSelectList([...selectList, province])
    }

    useEffect(() => {
        getProvince()
        return () => setSelectList([selectList[0]])
    }, [])

    let addField = (select) => {
        switch(select.name) {
            case 'education' : 
                return eduPlaceShow ? 
                    <Input 
                        input={select.input}
                        submit={submit}
                        saveValue={value => saveValue(select.input.name, value, select.input.required)}/> : null
            case 'province' :
                return <Select 
                        select={activePro}  
                        submit={submit}
                        saveValue={value => saveValue(activePro.name, value, activePro.required)}/>
            default : 
                return null
        }
    }

    let submitHandler = e => {
        e.preventDefault()
        setSubmit(true)
    }

    let counterRequired = () => {
        let inputsRequired = inputList.filter(input => input.required).length
        let selectRequired = selectList.filter(select => select.required).length
        let subInputRequired = 1 // eduPlace
        let subSelectRequired = 1 // city
        return inputsRequired + selectRequired + subInputRequired + subSelectRequired
    }

    let saveValue = (name, value, required) => {
        let valueSubmited_copy = valueSubmited
        let keys = Object.keys(valueSubmited_copy)
        if (!flag && (keys.length >= counterRequired() ||
            (keys.length === counterRequired() - 2 && !(keys.some(el => el === 'education'))))) {
                props.saveUser(valueSubmited_copy)
                alert('ثبت نام شما با موفقیت انجام شد !')
                flag = true
        }
        else if ((!required && value.length !== 0 && name !== value) || 
                (required && value.length !== 0 && name !== value)) {
                    valueSubmited_copy[`${name}`] = value
                    setValueSubmited(valueSubmited_copy)
        }
        setSubmit(false)
        setValueSubmited({})
    }

    return (
        <div>
            <h2 className='form-header'>رایگان ثبت نام کنید</h2>
            <form className='form-register'>
                {inputList.map(input => {
                    return <Input 
                            input={input} 
                            key={input.id} 
                            submit={submit}
                            saveValue={value => saveValue(input.name, value, input.required)}/>})}
                {selectList.map(select => {
                    return <Select 
                            select={select} 
                            key={select.id} 
                            submit={submit}
                            saveValue={value => saveValue(select.name, value, select.required)}
                            eduPlaceShow={bool => setEduPlaceShow(bool)}
                            activePro={pro => setActivePro({...activePro, options : pro})}>{addField(select)}</Select>})}
                <button type='submit' className='submit' onClick={e => submitHandler(e)}>ثبت نام</button>
            </form>
        </div>
    );
}

export default Register;
