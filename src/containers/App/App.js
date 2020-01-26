import React, { Component } from 'react';

import axios from '../../axios';
import ButtonForm from '../../components/ButtonForm/ButtonForm';
import Table from '../../components/Table/Table';
import Spinner from '../../components/UI/Spinner/Spinner';
import PersonInformation from '../../components/PersonInformation/PersonInformation';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler';
import RowAdder from '../RowAdder/RowAdder';

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
        tableHead: [{
                key: 'id',
                name: 'ID'
            },
            {
                key: 'firstName',
                name: 'First Name'
            },
            {
                key: 'lastName',
                name: 'Last Name'
            },
            {
                key: 'email',
                name: 'Email'
            },
            {
                key: 'phone',
                name: 'Phone'
            }],
        tableBody: null,
        loading: false,
        chosenRow: null,
        addRowModalView: false
    };

    getDataFromServer = (rowsNumber) => {
        axios.get(`?rows=${ rowsNumber }&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(response => {
                this.setState({ tableBody: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
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
        const newTableBody = [newRowObj,...this.state.tableBody];
        
        this.setState({ tableBody: newTableBody });
        this.modalViewHandler();
    }
    
    render() {
        const { buttonForm, tableHead, tableBody, loading, chosenRow, addRowModalView } = this.state;
        let content = null;
        let rowContent = null;

        if (chosenRow) {
            rowContent = <div>
                    <PersonInformation personObj={ chosenRow }/>
                </div>
        }

        if (tableBody && loading === false) {
            content = <div className={ classes.ContentWrapper }>
                    <Button
                        position='Single'
                        style={{ margin: '20px auto' }}
                        clicked={ this.modalViewHandler }>Add table row</Button>
                    <Table
                        head={ tableHead }
                        body={ tableBody }
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
                    buttonFormStructure={ buttonForm }
                    buttonClicked={ this.changeDataTypeHandler } />
                { content }
            </div>
        ); 
    }
}

export default withErrorHandler(App, axios);