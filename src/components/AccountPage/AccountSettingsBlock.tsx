import * as React from 'react';
import { Button, Form, Input, Segment } from 'semantic-ui-react';

class AccountSettingsBlock extends React.Component {
    render() {
        return (
            <>
                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Input}
                                label='Change Username'
                                placeholder='Username'
                            />
                            <Form.Field>
                                <label>Change Password</label>
                                <Input type='password' />
                            </Form.Field>
                            <Form.Field>
                                <label>Set Day Of Birth</label>
                                <Input
                                    transparent
                                    type="date"
                                    name="expiredDate"
                                    // onChange={this.handleForm}
                                    defaultValue={new Date()}
                                    placeholder="date placeholder"
                                // min={moment().format('YYYY-MM-DD')}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form>
                </Segment>
            </>
        )
    }
}

export default AccountSettingsBlock