import React from 'react';

import classes from './Button.module.css';

const button = ( props ) => {
    let classesArray = [classes.Button, classes[props.position]];
    let width = '100%'

    if (props.width) {
        width = `${ props.width }%`;
    }
    
    if (props.isActive) {
        classesArray.push(classes.Active);
    }

    return(
        <button
            className={ classesArray.join(' ') }
            style={{ width: width }}
            onClick={ props.clicked }>{ props.children }</button>
    );
}

export default button;