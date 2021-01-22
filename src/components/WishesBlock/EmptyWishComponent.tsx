import * as React from 'react';
import { Item, Segment } from 'semantic-ui-react';

class EmptyWishComponent extends React.Component {
    render() {
        return (
            <>
                <Segment vertical>
                    <Item.Group>
                        <Item >
                            <div>
                            There are no wishes, yet...
                            </div>
                        </Item>
                    </Item.Group>
                </Segment>
            </>
        )
    }
}

export default EmptyWishComponent