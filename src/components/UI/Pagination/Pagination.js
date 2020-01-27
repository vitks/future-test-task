import React from 'react';

import classes from './Pagination.module.css';

const pagination = (props) => {
    // Сборка массива для последующего преображения в элементы пагинации
    const pagesArray = [];
    let paginationForm = null;

    if ((props.pagesNumber > 1) && (props.pagesNumber <= 5)) {
        for (let i = 1; i < props.pagesNumber + 1; i++) {
            pagesArray.push(i);
        }
    } else if (props.pagesNumber > 5) {
        if (props.currentPage < 5) {
            pagesArray.push(1, 2, 3, 4, '...', props.pagesNumber);
        } else if (props.currentPage > props.pagesNumber - 4) {
            pagesArray.push(1, '...', props.pagesNumber - 3, props.pagesNumber - 2 , props.pagesNumber - 1, props.pagesNumber);
        } else {
            pagesArray.push(1, '...', props.currentPage - 1, props.currentPage , props.currentPage + 1, '...', props.pagesNumber);
        }
    }

    // Поэлементная сборка формы пагинации в соответствии с данными массива
    paginationForm = pagesArray.map((page, index) => {
        if (page === '...') {
            return(
                <span key={ index + page }>{ page }</span>
            );
        } else {
            let classesArray = [classes.Button];

            if (page === props.currentPage) classesArray.push(classes.Active);

            return(
                <button
                    key={ page }
                    onClick={ () => props.clicked(page) }
                    className={ classesArray.join(' ') }>{ page }</button>
            );
        }
    });

    // Рендер пагинации
    return(
        <div className={ classes.Pagination }>
            <button
                className={ classes.Button }
                onClick={ () => props.clicked('decrement') }>
                    <i className={ classes.Left }></i>
            </button>
            { paginationForm }
            <button
                className={ classes.Button }
                onClick={ () => props.clicked('increment') }>
                    <i className={ classes.Right }></i>
            </button>
        </div>
    );
}

export default pagination;