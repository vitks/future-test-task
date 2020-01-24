import React, { Component } from 'react';

import axios from '../axios';
import ButtonForm from '../components/ButtonForm/ButtonForm';
import Table from '../components/Table/Table';
import Spinner from '../components/UI/Spinner/Spinner';

import classes from './App.module.css';

class App extends Component {
    state = {
        buttons: {
            smallData: {
                isActive: true,
                position: 'Left',
                text: 'Small Data',
                value: 32
            },
            bigData: {
                isActive: false,
                position: 'Right',
                text: 'Big Data',
                value: 1000
            }
        },
        rowsNumber: 32,
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
        loading: true
    };

    componentDidMount() {
        axios.get(`?rows=${ this.state.rowsNumber }&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(response => {
                this.setState({ tableBody: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { buttons, tableHead, tableBody, loading } = this.state;
        let content = null;

        if (loading === true) {
            content = <Spinner />;
        } else if (tableBody && loading === false) {
            content = <div>
                    {/* <Finder /> */}
                    <Table
                        head={ tableHead }
                        body={ tableBody }/>
                </div>
        }

        return(
            <div className={ classes.MainWrapper  }>
                <ButtonForm buttons={ buttons }/>
                { content }
            </div>
        ); 
    }
}

export default App;