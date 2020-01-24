import React from 'react';

import Button from '../UI/Button/Button';

import classes from './ButtonForm.module.css';

const buttonForm = (props) => {
    let buttonsArray = [];
    let buttonFormContent = null;

    for (let key in props.buttons) {
        buttonsArray.push({
            key: key,
            config: props.buttons[key]
        });
    }

    let buttonWidth = (100/buttonsArray.length).toFixed(0).toString();

    buttonFormContent = buttonsArray.map(buttonObj => (
        <Button
            key={ buttonObj.key }
            isActive={ buttonObj.config.isActive }
            position={ buttonObj.config.position }
            width={ buttonWidth }>{ buttonObj.config.text }</Button>
    ));

    return(
        <div className={ classes.ButtonForm }>
            { buttonFormContent }
        </div>
    );
}

export default buttonForm;