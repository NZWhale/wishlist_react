import * as React from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

class LoginPage extends React.Component {
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
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                            />

                            <Button content='Login' primary />
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

export default LoginPage