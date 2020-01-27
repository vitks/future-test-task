import React from 'react';

import Button from '../Button/Button';

const buttonForm = (props) => {
    let buttonsArray = [];
    let buttonFormContent = null;

    for (let key in props.buttonFormStructure) {
        buttonsArray.push({
            key: key,
            config: props.buttonFormStructure[key]
        });
    }

    const buttonWidth = (100/buttonsArray.length).toFixed(0).toString() + '%';

    buttonFormContent = buttonsArray.map(buttonObj => (
        <Button
            key={ buttonObj.key }
            isActive={ buttonObj.config.isActive }
            position={ buttonObj.config.position }
            style={{ width: buttonWidth }}
            clicked={ () => props.buttonClicked(buttonObj.key) }>{ buttonObj.config.text }</Button>
    ));

    return(
        <div>
            { buttonFormContent }
        </div>
    );
}

export default buttonForm;