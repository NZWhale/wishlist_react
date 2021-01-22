import { nanoid } from 'nanoid';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Divider, Form, Grid, Icon, Message, Modal, Segment } from 'semantic-ui-react';
import setLoggedInStatus from '../../store/actionCreators/setLoggedStatus';
import store from '../../store/store';
import { StateInterface } from '../../types';
import { registrationUrl } from '../../utils';


interface LoginPageProps {
    loggedInUser: string;
    loggedInStatus: boolean
}

class LoginPage extends React.Component<LoginPageProps & RouteComponentProps> {
    state = {
        login: "",
        password: ""
    }
    render() {
        return (
            <Segment placeholder>
                <Grid columns={1} relaxed='very' stackable>
                    <Grid.Column>
                        <Form>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Username'
                                placeholder='Username'
                                onChange={(e) => this.setState({ login: e.target.value })}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                            />

                            <Button content='Login' primary
                                onClick={() => store.dispatch(setLoggedInStatus(true))} />
                        </Form>
                    </Grid.Column>

                </Grid>
                <Divider horizontal style={{ backgroundColor: "" }}>Or</Divider>
                <Grid.Column verticalAlign='middle'>
                    {/* <Button content='Sign up' icon='signup' size='big' /> */}
                    <ModalExampleDimmer />
                </Grid.Column>

            </Segment>
        )
    }
}

function ModalExampleDimmer() {
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")

    function registrationSubmit() {
        fetch(registrationUrl, {
            method: "POST",
            body: JSON.stringify({
                id: nanoid(),
                username: username,
                email: email,
            }),
            headers: {"Content-Type": "application/json"},
        })
    }

    return (
        <div>
            <Button
                content='Sign up'
                icon='signup'
                size='big'
                onClick={() => setOpen(true)}
            >
            </Button>

            <Modal
                size='tiny'
                dimmer="blurring"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div>
                    <Message
                        attached
                        header="Welcome to Doobki's Wish List!"
                        content='Fill out the form below to sign-up for a new account'
                    />
                    <Form className='attached fluid segment'>
                        <Form.Input 
                        label='Username' 
                        placeholder='Username' 
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Input 
                        label='Email' 
                        placeholder="Email" 
                        type='text' 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button 
                        color='blue'
                        onClick={() => registrationSubmit()}
                        >Submit</Button>
                    </Form>
                    <Message attached='bottom' warning>
                        <Icon name='help' />
                        Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
                    </Message>
                </div>
            </Modal>
        </div>
    )
}


const mapStateToProps = (state: StateInterface): LoginPageProps => ({
    loggedInUser: state.loggedInUser,
    loggedInStatus: state.loggedInStatus
})

export default connect(mapStateToProps)(withRouter(LoginPage))
