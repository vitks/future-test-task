import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class RowAdder extends Component {
    state = {
        rowAdderForm: {
            id: {
                elementType: 'input',
                elementConfig: {
                    type: 'id',
                    placeholder: 'ID'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /^[1-9][0-9]{0,}$/
                },
                valid: false,
                touched: false
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'firstName',
                    placeholder: 'First name'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /^[A-Z]{1}[a-z]{1,}$/
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'lastName',
                    placeholder: 'Last name'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /^[A-Z]{1}[a-z]{1,}$/
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail adress'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'phone',
                    placeholder: 'Phone number'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /^[(][0-9]{1,4}[)][0-9]{3}[-][0-9]{4}$/
                },
                valid: false,
                touched: false
            },
            streetAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'streetAddress',
                    placeholder: 'Street address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'city',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /^[A-Z]{1}[a-z]{1,}\D*$/
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'state',
                    placeholder: 'State'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /^[A-Z]{2}$/
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'zip',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: /^\d{5}$/
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'description',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            }
        },
        addButtonView: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) isValid = value.trim() !== '' && isValid;

        if (rules.pattern) isValid = rules.pattern.test(value) && isValid;

        return isValid;
    }

    allInputsCheckValidity = () => {
        let validityArray = [];
        let isHidden = true;

        for (let key in this.state.rowAdderForm) {
            if (this.state.rowAdderForm[key].validation.required) {
                validityArray.push({
                    valid: this.state.rowAdderForm[key].valid,
                    touched: this.state.rowAdderForm[key].touched
                });
            }
        }
        
        validityArray.forEach(validityElement => {
            isHidden = !validityElement.valid || !validityElement.touched;
        });

        this.setState({addButtonView: !isHidden});
    }

    inputChangeHandler = (event, formElement) => {
        const updatedRowAdderForm = {
            ...this.state.rowAdderForm,
            [formElement]: {
                ...this.state.rowAdderForm[formElement],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.rowAdderForm[formElement].validation)
            }
        };

        this.setState({rowAdderForm: updatedRowAdderForm});
    }

    render() {
        const { rowAdderForm, addButtonView } = this.state;
        let formElementsArray = [];

        for (let key in this.state.rowAdderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.rowAdderForm[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ));
        
        return (
            <div>
                <form>{ form }</form>
                { addButtonView ?
                    <Button
                        position='Single'
                        style={{ marginBottom: '10px 0px 0px 5px' }}
                        clicked={ () => this.props.addRowClicked({
                            id: rowAdderForm.id.value,
                            firstName: rowAdderForm.firstName.value,
                            lastName: rowAdderForm.lastName.value,
                            email: rowAdderForm.email.value,
                            phone: rowAdderForm.phone.value,
                            address: {
                                streetAddress: rowAdderForm.streetAddress.value,
                                city: rowAdderForm.city.value,
                                state: rowAdderForm.state.value,
                                zip: rowAdderForm.zip.value
                            },
                            description: rowAdderForm.description.value }) }>Add</Button>
                    : null }
            </div>
        );
    }
}

export default RowAdder;