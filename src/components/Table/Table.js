import React from 'react';

import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';

import classes from './Table.module.css';

const table = (props) => {
    return(
        <table className={ classes.Table }>
            <TableHead columnHeads={ props.head }/>
            <TableBody
                rows={ props.body }
                columns={ props.head }/>
        </table>
    );
}

export default table;