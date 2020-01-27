import React from 'react';

import classes from './Spinner.module.css'

// Рендер спиннера
const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;