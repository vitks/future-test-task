import React from 'react';

import classes from './TableBody.module.css';

const tableBody = (props) => {
    const bodyContent = props.rows.map(rowObj => {
        const cells = props.columns.map(columnObj => {
            return(
                <td className={ classes.Cell } key={ columnObj.key + '_' + rowObj.id }>
                        <span className={ classes.Text }>{ rowObj[columnObj.key] }</span>
                </td>
            );
        });

        return(
            <tr className={ classes.Row } key={ rowObj.id }>
                    { cells }
            </tr>
        );
    });

    return(
        <tbody>
            { bodyContent }
        </tbody>
    );
}

export default tableBody;