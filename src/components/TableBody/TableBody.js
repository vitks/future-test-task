import React from 'react';

import classes from './TableBody.module.css';

const tableBody = (props) => {
    // Вычисление ширины одной ячейки
    const columnWidth = (100/props.columns.length).toFixed(0).toString() + '%';
    // Поэлементная сборка тела таблицы в соответствии с данными
    const bodyContent = props.rows.map(rowObj => {
        // Поэлементная сборка строк таблицы
        const cells = props.columns.map(columnObj => {
            return(
                <td className={ classes.Cell }
                    style={{ width: columnWidth }}
                    key={ `${ columnObj.key }_${ rowObj.id }` }>
                        <span className={ classes.Text }>{ rowObj[columnObj.key] }</span>
                </td>
            );
        });

        return(
            <tr className={ classes.Row }
                key={ `${ rowObj.id }_${ rowObj.firstName }_${ rowObj.lastName }` }
                onClick={ () => props.rowClicked(rowObj) }>
                    { cells }
            </tr>
        );
    });

    // Рендер тела таблицы
    return(
        <tbody>{ bodyContent }</tbody>
    );
}

export default tableBody;