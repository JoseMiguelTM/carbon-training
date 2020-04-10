import React, {useState} from 'react';
import {
    Button,
    Form,
    FormGroup,
    TextInput,
    Dropdown,
    Checkbox
} from 'carbon-components-react';
import axios from 'axios';

const inputs = {
    userFirstName: {value: '', error: false, rule: new RegExp(/[^\s]+/)},
    userLastName: {value: '', error: false, rule: new RegExp(/[^\s]+/)},
    userW3id: {value: '', error: false, rule: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)},
    userPassword: {value: '', error: false, rule: new RegExp(/^.{6,}$/)},
}

const AddData = () => {
    const [input, setInput] = useState(inputs);
    const [businessUnit, setBusinessUnit] = useState('');
    let technologies = [];
    const businessUnits = [
        {
            id: 'gts',
            text: 'GTS'
        },
        {
            id: 'gbs',
            text: 'GBS'
        },
        {
            id: 'cio',
            text: 'BT-CIO'
        },
        {
            id: 'pwr',
            text: 'Power Systems'
        }
    ];

    const onChangeInput = e => {
        const {name, value} = e.target;
        const error = !input[name].rule.test(value);
        setInput({
            ...input,
            [name]: {...input[name], value, error}
        });
    }

    const handleSubmit = (e) => {
        let newUser = {
            firstName: input.userFirstName.value,
            lastName: input.userLastName.value,
            w3id: input.userW3id.value,
            password: input.userPassword.value,
            businessUnit: businessUnit,
            technologies: technologies.toString()
        }

        axios.post('http://localhost:3001/addUser', newUser)
        .then((res) => {
            console.log(res);
            alert('Done!');
        })
        .catch(
            function(error) {
                console.log(error)
            }
        );
    }

    const handleCheck = (checked, value) => {
        if(checked) {
            technologies.push(value);
        }
        else {
            const index = technologies.indexOf(value);
            technologies.splice(index, 1); 
        }
    }

    console.log('render');
    return <React.Fragment>
        <div className = "bx--grid bx--grid--full-width">
            <div className = "bx--row addPage__content">
                <div className = "bx--col-lg-16">
                    <h1 className = "landing-page__heading">
                        Add Data to DB2
                    </h1>
                </div>
            </div>

            <div className = "bx--row">
                <div className = "bx--col-lg-4"></div>
                <div className = "bx--col-lg-8">
                    <Form>
                        <div className = "bx--row">
                            <div className = "bx--col-lg-8">
                                <FormGroup legendText = ''>
                                    <TextInput
                                        onChange = {onChangeInput}
                                        id = "a"
                                        name = "userFirstName"
                                        labelText = "First Name" 
                                    />
                                </FormGroup>
                            </div>
                            <div className = "bx--col-lg-8">
                                <FormGroup legendText = "">
                                    <TextInput
                                        onChange = {onChangeInput}
                                        id = "b"
                                        name = "userLastName"
                                        labelText = "Last Name" 
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        
                        <div className = "bx--row">
                            <div className = "bx--col-lg-16">
                                <FormGroup legendText = ''>
                                    <TextInput
                                        onChange = {onChangeInput}
                                        id = "c"
                                        name = "userW3id"
                                        labelText = "w3id"
                                        invalid = {input.userW3id.error}
                                        invalidText = "Invalid w3id"
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className = "bx--row">
                            <div className = "bx--col-lg-16">
                                <FormGroup legendText = "">
                                    <TextInput
                                        onChange = {onChangeInput}
                                        id = 'd'
                                        name = "userPassword"
                                        labelText = "Password"
                                        invalid = {input.userPassword.error}
                                        invalidText = "Password must contain at least 6 characters"
                                        type = "password"
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className = "bx--row">
                            <div className = "bx--col-lg-8">
                                <Dropdown
                                    ariaLabel = "dropBusinessUnit"
                                    id = "user-business-unit"
                                    items = {businessUnits}
                                    itemToString = {businessUnits => (businessUnits ? businessUnits.text : '') }
                                    titleText = "Business Unit"
                                    label = "Choose..."
                                    onChange = {e => setBusinessUnit(e.selectedItem.text)}
                                />
                            </div>

                            <div className = "bx--col-lg-8">
                                <fieldset className = "bx--fieldset">
                                    <legend className = "bx--label">Known Technologies</legend>
                                    <Checkbox
                                        labelText = "React"
                                        id = "react"
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "Angular"
                                        id = "angular"
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "Vue.JS"
                                        id = "vue"
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "CouchDB"
                                        id = "couch"
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "IBM DB2"
                                        id = "db2"
                                        onChange = {handleCheck}
                                    />
                                </fieldset>
                            </div>
                        </div>

                        <Button
                            kind = "primary"
                            onClick = {handleSubmit}
                        >
                            Create user
                        </Button>
                    </Form>
                </div>
            </div>
            </div>
    </React.Fragment>
}

export default AddData;