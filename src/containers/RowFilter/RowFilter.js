import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ButtonForm from '../../components/UI/ButtonForm/ButtonForm';

import classes from './RowFilter.module.css';

class RowFilter extends Component {
    state = {
        filterInput: {
            elementType: 'input',
            elementConfig: {
                type: 'filter',
                placeholder: ''
            },
            value: ''
        },
        filterButtonForm: {
            filterButtons: {
                id: {
                    position: 'Left',
                    text: 'ID',
                    isActive: false
                },
                firstName: {
                    position: 'Middle',
                    text: 'First name',
                    isActive: false
                },
                lastName: {
                    position: 'Middle',
                    text: 'Last name',
                    isActive: false
                },
                email: {
                    position: 'Middle',
                    text: 'E-mail',
                    isActive: false
                },
                phone: {
                    position: 'Right',
                    text: 'Phone',
                    isActive: false
                }
            },
            chosenColumns: []
        }
    }

    rowFilterInputChangeHandler = (event) => {
        const updatedFilterInput = {
            ...this.state.filterInput,
            value: event.target.value
        };

        this.setState({ filterInput: updatedFilterInput });
    }

    chooseFilteredColumnsHandler = (buttonKey) => {
        const { filterButtonForm } = this.state;
        let updatedFilterButtonForm = null;

        updatedFilterButtonForm = {
            ...filterButtonForm,
            filterButtons: {
                ...filterButtonForm.filterButtons,
                [buttonKey]: {
                    ...filterButtonForm.filterButtons[buttonKey],
                    isActive: !filterButtonForm.filterButtons[buttonKey].isActive
                }
            },
            chosenColumns: [...filterButtonForm.chosenColumns]
        }

        if (updatedFilterButtonForm.filterButtons[buttonKey].isActive) {
            updatedFilterButtonForm.chosenColumns.push(buttonKey);
        } else {
            const index = updatedFilterButtonForm.chosenColumns.indexOf(buttonKey);

            updatedFilterButtonForm.chosenColumns.slice(index, 1);
        }
        
        this.setState({ filterButtonForm: updatedFilterButtonForm });
    }

    render() {
        const { filterInput, filterButtonForm } = this.state;

        return(
            <div className={ classes.RowFilter }>
                <div className={ classes.FilterButtonForm }>
                    <ButtonForm
                            buttonFormStructure={ filterButtonForm.filterButtons }
                            buttonClicked={ this.chooseFilteredColumnsHandler } />
                </div>
                <Input
                    elementType={ filterInput.elementType }
                    elementConfig={ filterInput.elementConfig }
                    value={ filterInput.value }
                    changed={ (event) => this.rowFilterInputChangeHandler(event)} />
                <div>
                    <Button
                        style={{ margin: '10px 0px 0px 6px', width: '99%' }}
                        position='Single'
                        clicked={ () => this.props.filterButtonClicked( filterInput.value, filterButtonForm.chosenColumns) }>Filter</Button>
                </div>
            </div>
        );
    }
}

export default RowFilter;