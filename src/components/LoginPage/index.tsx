import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import setLoggedInUser from '../../store/actionCreators/setLoggedInUser';
import setLoggedInStatus from '../../store/actionCreators/setLoggedStatus';
import store from '../../store/store';
import { StateInterface } from '../../types';
import { loginUrl} from '../../utils';
import SignUpModal from './SignUpModal';


interface LoginPageProps {
    loggedInUser: {
        username: string;
        id: string;
    }
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
                                label='Email'
                                placeholder='Email'
                                onChange={(e) => this.setState({ login: e.target.value })}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                onChange={(e) => {
                                    this.setState({ password: e.target.value })
                                }}
                            />

                            <Button content='Login' primary
                                onClick={() => {
                                    fetch(loginUrl, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            email: this.state.login,
                                            password: this.state.password
                                        }),
                                        headers: {"Content-Type": "application/json", "withCredentials": "true", "credentials": 'include'},
                                    }).then(response => {
                                        if(response.status === 200) {
                                            const data = response.json()
                                            data.then(data => store.dispatch(setLoggedInUser(data)))
                                            store.dispatch(setLoggedInStatus(true))
                                        } else if(response.status === 401){
                                            alert("Invalid credentials")
                                            //TODO: create beautiful popup window
                                        }
                                    })
                                }} />
                        </Form>
                    </Grid.Column>

                </Grid>
                <Divider horizontal style={{ backgroundColor: "" }}>Or</Divider>
                <Grid.Column verticalAlign='middle'>
                    <SignUpModal />
                </Grid.Column>

            </Segment>
        )
    }
}




const mapStateToProps = (state: StateInterface): LoginPageProps => ({
    loggedInUser: state.loggedInUser,
    loggedInStatus: state.loggedInStatus
})

export default connect(mapStateToProps)(withRouter(LoginPage))
