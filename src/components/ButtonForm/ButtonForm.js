import React from 'react';

import Button from '../UI/Button/Button';

import classes from './ButtonForm.module.css';

const buttonForm = (props) => {
    let buttonsArray = [];
    let buttonFormContent = null;
    let buttonWidth = '100%'

    for (let key in props.buttonFormStructure.buttons) {
        buttonsArray.push({
            key: key,
            config: props.buttonFormStructure.buttons[key]
        });
    }

    buttonWidth = (100/buttonsArray.length).toFixed(0).toString() + '%';

    buttonFormContent = buttonsArray.map(buttonObj => (
        <Button
            key={ buttonObj.key }
            isActive={ buttonObj.config.isActive }
            position={ buttonObj.config.position }
            style={{ width: buttonWidth }}
            clicked={ () => props.buttonClicked(buttonObj.key) }>{ buttonObj.config.text }</Button>
    ));

    return(
        <div className={ classes.ButtonForm }>
            { buttonFormContent }
        </div>
    );
}

export default buttonForm;