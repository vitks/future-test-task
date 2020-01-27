import React, { Component } from 'react';

import axios from '../../axios';
import ButtonForm from '../../components/UI/ButtonForm/ButtonForm';
import Table from '../Table/Table';
import Spinner from '../../components/UI/Spinner/Spinner';
import PersonInformation from '../../components/PersonInformation/PersonInformation';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler';
import RowAdder from '../RowAdder/RowAdder';
import RowFilter from '../RowFilter/RowFilter';

import classes from './App.module.css';

class App extends Component {
    state = {
        buttonForm: {
            buttons: {
                smallData: {
                    position: 'Left',
                    text: 'Small Data',
                    value: 32,
                    isActive: false
                },
                bigData: {
                    position: 'Right',
                    text: 'Big Data',
                    value: 1000,
                    isActive: false
                },
            },
            activeButton: null
        },
        tableStructure: {
            tableHead: [
                {
                    key: 'id',
                    name: 'ID',
                    sortDirection: null,
                    sort: () => this.headSortHandler('id')
                },
                {
                    key: 'firstName',
                    name: 'First Name',
                    sortDirection: null,
                    sort: () => this.headSortHandler('firstName')
                },
                {
                    key: 'lastName',
                    name: 'Last Name',
                    sortDirection: null,
                    sort: () => this.headSortHandler('lastName')
                },
                {
                    key: 'email',
                    name: 'Email',
                    sortDirection: null,
                    sort: () => this.headSortHandler('email')
                },
                {
                    key: 'phone',
                    name: 'Phone',
                    sortDirection: null,
                    sort: () => this.headSortHandler('phone')
                }
            ],
            tableBody: null
        },
        loading: false,
        chosenRow: null,
        addRowModalView: false,
        filter: {
            value: '',
            chosenColumns: []
        }
    };

    getDataFromServer = (rowsNumber) => {
        axios.get(`?rows=${ rowsNumber }&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(response => {
                const updatedTableHead = this.state.tableStructure.tableHead.map(tableHeadObj => {
                    return { ...tableHeadObj, sortDirection: null };
                })
                const updatedTableStructure = {
                    ...this.state.tableStructure,
                    tableHead: updatedTableHead,
                    tableBody: response.data
                };
                const updatedFilter = {
                    value: '',
                    chosenColumns: []
                }

                this.setState({ tableStructure: updatedTableStructure, filter: updatedFilter, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    headSortHandler = (columnKey) => {
        const { tableStructure } = this.state;
        let updatedTableBody = [...tableStructure.tableBody];
        let updatedSortDirection = null;
        const columnIndex = tableStructure.tableHead.map(tableHeadObj => {
            return tableHeadObj.key;
        }).indexOf(columnKey);

        switch(tableStructure.tableHead[columnIndex].sortDirection) {
            case('Descend'):
                updatedTableBody = updatedTableBody.sort((a, b) => {
                    return this.compare(a[columnKey], b[columnKey]);
                });
                updatedSortDirection = 'Ascend';
                break;
            case('Ascend'):
                updatedTableBody = updatedTableBody.sort((a, b) => {
                    return this.compare(b[columnKey], a[columnKey]);
                });
                updatedSortDirection = 'Descend';
                break;
            default:
                updatedTableBody = updatedTableBody.sort((a, b) => {
                    return this.compare(a[columnKey], b[columnKey]);
                });
                updatedSortDirection = 'Ascend';
        }

        let updatedTableStructure = {
            ...tableStructure,
            tableHead: [...tableStructure.tableHead],
            tableBody: updatedTableBody
        };

        updatedTableStructure.tableHead[columnIndex].sortDirection = updatedSortDirection;

        this.setState({ tableStructure: updatedTableStructure });
    }

    compare = (a, b) => {
        if (a > b)  {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    }

    changeDataTypeHandler = (buttonKey) => {
        const { buttonForm } = this.state;
        let updatedButtonForm = null;

        if (buttonForm.activeButton !== buttonKey) {
            if (buttonForm.activeButton) {
                updatedButtonForm = {
                    ...buttonForm,
                    buttons: {
                        ...buttonForm.buttons,
                        [buttonForm.activeButton]: {
                            ...buttonForm.buttons[buttonForm.activeButton],
                            isActive: !buttonForm.buttons[buttonForm.activeButton].isActive
                        },
                        [buttonKey]: {
                            ...buttonForm.buttons[buttonKey],
                            isActive: !buttonForm.buttons[buttonKey].isActive
                        }
                    },
                    activeButton: buttonKey
                }
            } else {
                updatedButtonForm = {
                    ...buttonForm,
                    buttons: {
                        ...buttonForm.buttons,
                        [buttonKey]: {
                            ...buttonForm.buttons[buttonKey],
                            isActive: !buttonForm.buttons[buttonKey].isActive
                        }
                    },
                    activeButton: buttonKey
                }
            }

            this.setState({ buttonForm: updatedButtonForm, loading: true, chosenRow: null });
            this.getDataFromServer(buttonForm.buttons[buttonKey].value);
        }
    }

    onTableRowClickHandler = (tableRowObj) => {
        this.setState({ chosenRow: tableRowObj });
    }

    modalViewHandler = () => {
        this.setState({ addRowModalView: !this.state.addRowModalView });
    }

    addRowHandler = (newRowObj) => {
        const newTableStructure = {
            ...this.state.tableStructure,
            tableBody: [newRowObj, ...this.state.tableStructure.tableBody]
        };
        
        this.setState({ tableStructure: newTableStructure });
        this.modalViewHandler();
    }

    filterHandler = (newValue, newChosenColumns) => {
        const updatedFilter = {
            ...this.state.filter,
            value: newValue,
            chosenColumns: newChosenColumns
        }
        
        this.setState({ filter: updatedFilter })
    }

    filterTableBody = (tableBody) => {
        const { filter, tableStructure } = this.state;
        let filteredTableBody = null;
       
        if (filter.value !== '' && filter.chosenColumns !== []) {
            filteredTableBody = [];

            tableBody.forEach(row => {
                let flag = false;

                filter.chosenColumns.forEach(column => {
                    if (row[column].toString().toLowerCase().indexOf(filter.value) !== -1) {
                        flag = true;
                    }
                });

                if (flag) filteredTableBody.push(row);
            });
        } else {
            if (tableStructure.tableBody) {
                filteredTableBody = [...tableStructure.tableBody];
            }
        }

        return filteredTableBody;
    }
    
    render() {
        const { buttonForm, tableStructure, loading, chosenRow, addRowModalView } = this.state;
        const newTableStructure = {
            ...tableStructure,
            tableBody: this.filterTableBody(tableStructure.tableBody)
        };
        let content = null;
        let rowContent = null;

        if (chosenRow) {
            rowContent = <div>
                    <PersonInformation personObj={ chosenRow }/>
                </div>;
        }

        if (tableStructure.tableBody && loading === false) {
            content = <div className={ classes.ContentWrapper }>
                    <Button
                        position='Single'
                        style={{ margin: '20px 0px 10px 0px', width: '100%' }}
                        clicked={ this.modalViewHandler }>Add table row</Button>
                    <RowFilter filterButtonClicked={ this.filterHandler } />
                    <Table
                        structure={ newTableStructure }
                        maxRowsNumber={ 10 }
                        tableRowClicked={ this.onTableRowClickHandler } />
                    <Modal
                        show={ addRowModalView }
                        modalClose={ this.modalViewHandler }>
                            <RowAdder addRowClicked={ this.addRowHandler } />
                    </Modal>
                    { rowContent }
                </div>
        } else if (loading === true) {
            content = <Spinner />;
        } else if (!buttonForm.activeButton) { 
            content = <p className={ classes.InitialText }>Please, choose a data type for upload.</p>
        }

        return(
            <div className={ classes.App }>
                <ButtonForm
                    buttonFormStructure={ buttonForm.buttons }
                    buttonClicked={ this.changeDataTypeHandler } />
                { content }
            </div>
        ); 
    }
}

export default withErrorHandler(App, axios);