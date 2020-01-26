import React from 'react';

import classes from './TableHead.module.css';

const tableHead = (props) => {
    const headContent = props.columnHeads.map(columnHeadObj => {
        return(
            <th className={ classes.Cell }
                key={ columnHeadObj.key }>
                    <span className={ classes.Text }>{ columnHeadObj.name }</span>
            </th>
        );
    });

    return(
        <thead className={ classes.TableHead }>
            <tr className={ classes.Row }>{ headContent }</tr>
        </thead>
    );
}

export default tableHead;