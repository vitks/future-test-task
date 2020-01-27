import React from 'react';

import classes from './Button.module.css';

// Рендер кнопки
const button = ( props ) => {
    let classesArray = [classes.Button, classes[props.position]];
    let buttonStyle = null;

    if (props.style) {
        buttonStyle = props.style;
    }
    
    if (props.isActive) {
        classesArray.push(classes.Active);
    }

    return(
        <button
            className={ classesArray.join(' ') }
            style={ buttonStyle }
            onClick={ props.clicked }>{ props.children }</button>
    );
}

export default button;