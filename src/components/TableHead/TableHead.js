import React from 'react';

import classes from './TableHead.module.css';

const tableHead = (props) => {
    const columnWidth = (100/props.columnHeads.length).toFixed(0).toString() + '%';
    const headContent = props.columnHeads.map(columnHeadObj => {
        let arrow = null;

        if (columnHeadObj.sortDirection) {
            let classesArray = [classes.Sort];

            classesArray.push(classes[columnHeadObj.sortDirection]);
            arrow = <i className={ classesArray.join(' ') }></i>;
        }

        return(
            <th className={ classes.Cell }
                style={{ width: columnWidth }}
                key={ columnHeadObj.key }
                onClick={ () => columnHeadObj.sort() }>
                    <span className={ classes.Text }>{ columnHeadObj.name }</span>
                    { arrow }
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