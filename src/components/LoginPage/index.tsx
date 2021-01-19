import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import setLoggedInStatus from '../../store/actionCreators/setLoggedStatus';
import store from '../../store/store';
import { StateInterface } from '../../types';


interface LoginPageProps {
    loggedInUser: string;
    loggedInStatus: boolean
}

class LoginPage extends React.Component<LoginPageProps & RouteComponentProps> {
    state={ 
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
                                onChange={(e) => this.setState({login: e.target.value})}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                            />

                            <Button content='Login' primary 
                                    onClick={() => store.dispatch(setLoggedInStatus(true))}/>
                        </Form>
                    </Grid.Column>

                </Grid>
                <Divider horizontal style={{backgroundColor: ""}}>Or</Divider>
                <Grid.Column verticalAlign='middle'>
                    <Button content='Sign up' icon='signup' size='big' />
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
