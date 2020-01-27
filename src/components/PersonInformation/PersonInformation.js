import React from 'react';

import classes from './PersonInformation.module.css';

// Рендер данных выбранной строки таблицы
const personInformation = (props) => (
    <div className={ classes.PersonInformationForm }>
        <span>Выбран пользователь <b>{ props.personObj.firstName } { props.personObj.lastName }</b></span>
        <br /><span>Описание:</span>
        <br /><span><textarea defaultValue={ props.personObj.description }></textarea></span>
        <br /><span>Адрес проживания: <b>{ props.personObj.address.streetAddress }</b></span>
        <br /><span>Город: <b>{ props.personObj.address.city }</b></span>
        <br /><span>Провинция/штат: <b>{ props.personObj.address.state }</b></span>
        <br /><span>Индекс: <b>{ props.personObj.address.zip }</b></span>
    </div>
);

export default personInformation;