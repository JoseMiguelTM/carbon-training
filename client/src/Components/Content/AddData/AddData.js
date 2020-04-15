import React, {useState} from 'react';
import {
    Button,
    Form,
    FormGroup,
    TextInput,
    Dropdown,
    Checkbox,
    ToastNotification,
    InlineLoading
} from 'carbon-components-react';
import axios from 'axios';

const inputs = {
    userFirstName: {value: '', error: false, rule: new RegExp(/[^\s]+/)},
    userLastName: {value: '', error: false, rule: new RegExp(/[^\s]+/)},
    userW3id: {value: '', error: false, rule: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)},
    userPassword: {value: '', error: false, rule: new RegExp(/^.{6,}$/)},
}

const technologiesList = {
    React: false, 
    Angular: false,
    VueJS: false,
    CouchDB: false,
    DB2: false
}

const statuses = {
    showToastSuccess: false, 
    showToastError: false,
    showLoading: false, 
    submitStatus: 'active',
    submitDescription: "Creating user...",
    captionToast: "If you can see a code here please contact System Administrator",
    timeElapsed: 0
}

const businessUnits = [
    {
        id: 'u1',
        text: 'Unit 1'
    },
    {
        id: 'u2',
        text: 'Unit 2'
    },
    {
        id: 'u3',
        text: 'Unit 3'
    },
    {
        id: 'u4',
        text: 'Unit 4'
    }
];

const AddData = () => {
    const [input, setInput] = useState(inputs);
    const [businessUnit, setBusinessUnit] = useState('');
    const [technologiesState, setTechnologiesState] = useState(technologiesList);
    const [done, setDone] = useState(statuses);
    let technologies = [];
    let initTime, finalTime;

    const onChangeInput = e => {
        const {name, value} = e.target;
        const error = !input[name].rule.test(value);
        setInput({
            ...input,
            [name]: {...input[name], value, error}
        });
    }

    const handleSubmit = (e) => {
        if(input.userFirstName.value === '' || input.userLastName.value === '' || input.userW3id.value === '' || input.userPassword.value === '' || businessUnit === '') {
            setInput(inputs);
            setDone({showToastSuccess: false, showToastError: true, showLoading: true, submitStatus: "error", submitDescription: "Failed, try again", captionToast: "If you can see a code here please contact System Administrator", timeElapsed: 0});
        }
        else {
            Object.keys(technologiesState).map(technology => {
                if(technologiesState[technology]) {
                    technologies.push(technology);
                }
            })
            let newUser = {
                firstName: input.userFirstName.value,
                lastName: input.userLastName.value,
                w3id: input.userW3id.value,
                password: input.userPassword.value,
                businessUnit: businessUnit,
                technologies: technologies.toString()
            }
            setDone({showToastSuccess: false, showToastError: false, showLoading: true, submitStatus: "active", submitDescription: "Wait a moment...", captionToast: "Nothing", timeElapsed: 0});
            initTime = new Date().getTime();

            axios.post('http://localhost:8080/addUser', newUser)
            .then((res) => {
                if(res.data.code !== 200) {
                    //Server status failed
                    finalTime = new Date().getTime() - initTime;
                    setDone({showToastSuccess: false, showToastError: true, showLoading: true, submitStatus: 'error', submitDescription: "Failed, try again", captionToast: "Server Response Code: " + res.data.code + ", " + finalTime + " ms.", timeElapsed: finalTime});

                }
                else {
                    //Server status OK
                    finalTime = new Date().getTime() - initTime;
                    setDone({showToastSuccess: true, showToastError: false, showLoading: true, submitStatus: 'finished', submitDescription: "Done!", captionToast: "Nothing", timeElapsed: finalTime});
                    setInput(inputs);
                    setBusinessUnit('');
                    setTechnologiesState(technologiesList);
                }
            })
            .catch(
                function(error) {
                    setDone({showToastSuccess: false, showToastError: true, showLoading: true, submitStatus: "error", submitDescription: "Failed, try again", captionToast: error.message + ": Check your connection status and try again", timeElapsed: 0});
                }
            );
        }
    }

    const handleCheck = (checked, value) => {
        switch(value) {
            case 'React': {
                setTechnologiesState({
                    React: checked, 
                    Angular: technologiesState.Angular,
                    VueJS: technologiesState.VueJS,
                    CouchDB: technologiesState.CouchDB,
                    DB2: technologiesState.DB2
                });
                break;
            }
            case 'Angular': {
                setTechnologiesState({
                    React: technologiesState.React, 
                    Angular: checked,
                    VueJS: technologiesState.VueJS,
                    CouchDB: technologiesState.CouchDB,
                    DB2: technologiesState.DB2
                });
                break;
            }
            case 'Vue.JS': {
                setTechnologiesState({
                    React: technologiesState.React, 
                    Angular: technologiesState.Angular,
                    VueJS: checked,
                    CouchDB: technologiesState.CouchDB,
                    DB2: technologiesState.DB2
                });
                break;
            }
            case 'CouchDB': {
                setTechnologiesState({
                    React: technologiesState.React, 
                    Angular: technologiesState.Angular,
                    VueJS: technologiesState.VueJS,
                    CouchDB: checked,
                    DB2: technologiesState.DB2
                });
                break;
            }
            case 'IBM DB2': {
                setTechnologiesState({
                    React: technologiesState.React, 
                    Angular: technologiesState.Angular,
                    VueJS: technologiesState.VueJS,
                    CouchDB: technologiesState.CouchDB,
                    DB2: checked
                });
                break;
            }
        }
    }

    
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
                                        value = {input.userFirstName.value}
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
                                        value = {input.userLastName.value}
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
                                        value = {input.userW3id.value}
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
                                        value = {input.userPassword.value}
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
                                        id = "React"
                                        checked = {technologiesState.React}
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "Angular"
                                        id = "Angular"
                                        checked = {technologiesState.Angular}
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "Vue.JS"
                                        id = "Vue.JS"
                                        checked = {technologiesState.VueJS}
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "CouchDB"
                                        id = "CouchDB"
                                        checked = {technologiesState.CouchDB}
                                        onChange = {handleCheck}
                                    />
                                    <Checkbox
                                        labelText = "IBM DB2"
                                        id = "IBM DB2"
                                        checked = {technologiesState.DB2}
                                        onChange = {handleCheck}
                                    />
                                </fieldset>
                            </div>
                        </div>

                        <div className = "bx--row">
                            <div className = "bx--col-lg-8">
                                <Button
                                    kind = "primary"
                                    onClick = {handleSubmit}
                                >
                                    Create user
                                </Button>
                            </div>
                            <div className = "bx--col-lg-4 inlineText">
                                {done.showLoading ? <InlineLoading status = {done.submitStatus} description = {done.submitDescription}/> : ''}
                            </div> 
                        </div>
                    </Form>
                </div>
                <div className = "bx--col-lg-4">
                    {done.showToastSuccess ? <ToastNotification 
                                title = "Success" 
                                subtitle = "User has been added and you can view your users on View Data page" 
                                kind = {"success"} 
                                caption = {"Time elapsed: " + done.timeElapsed + " ms."}
                            /> : ''}
                    {done.showToastError ? <ToastNotification 
                                title = "Oh no" 
                                subtitle = "There was a problem creating your user, please try again"
                                kind = {"error"} 
                                caption = {done.captionToast} 
                            /> : ''}
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default AddData;