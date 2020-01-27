import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClass = [classes.InputElement];
    let inputState = {
        valid: true,
        touched: true
    };

    // Покраска инпута, если он не валиден
    inputState.valid = props.valid;
    inputState.touched = props.touched;

    if (!props.valid && props.touched) {
        inputClass.push(classes.Invalid);
    }

    // Выбор типа инпута (input/textarea)
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        default:
            inputElement = <input
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
    }

    // Рендер инпута
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;