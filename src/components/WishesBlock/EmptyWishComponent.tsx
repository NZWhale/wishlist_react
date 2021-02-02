import * as React from 'react';
import { Item, Segment } from 'semantic-ui-react';

class EmptyWishComponent extends React.Component {
    render() {
        return (
            <>
                <Segment vertical>
                            <div>
                            There are no wishes, yet...
                            </div>
                </Segment>
            </>
        )
    }
}

export default EmptyWishComponent