import React from 'react';

import Button from '../Button/Button';

const buttonForm = (props) => {
    let buttonsArray = [];
    let buttonFormContent = null;

    // Превращение входящего объекта формы кнопок в массив для последующего преобразования в элементы формы
    for (let key in props.buttonFormStructure) {
        buttonsArray.push({
            key: key,
            config: props.buttonFormStructure[key]
        });
    }

    // Вычисление ширины одной кнопки
    const buttonWidth = (100/buttonsArray.length).toFixed(0).toString() + '%';

    // Поэлементная сборка формы с элементами в соответствии с данными массива
    buttonFormContent = buttonsArray.map(buttonObj => (
        <Button
            key={ buttonObj.key }
            isActive={ buttonObj.config.isActive }
            position={ buttonObj.config.position }
            style={{ width: buttonWidth }}
            clicked={ () => props.buttonClicked(buttonObj.key) }>{ buttonObj.config.text }</Button>
    ));

    // Рендер формы с кнопками
    return(
        <div>
            { buttonFormContent }
        </div>
    );
}

export default buttonForm;