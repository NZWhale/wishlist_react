import * as React from 'react';
import { Wish } from '../../types';
import noImage from '../../images/noImage.jpg';
import { Item, Segment } from 'semantic-ui-react';


interface SingleWishProps {
    wish: Wish
}

class SingleWish extends React.Component<SingleWishProps> {
    render() {
        const {image, title, url, comment} = this.props.wish
        return (
            <>
                <Segment vertical>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' src={image ? image : noImage} />
                            <Item.Content>
                                <Item.Header as=''>{title ? title : "null"}</Item.Header>
                                <Item.Description>
                                    {comment ? comment : "null"}
                                </Item.Description>
                                <Item.Extra src={url ? url : "null"}>{url ? url : "null"}</Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </>
        )
    }
}

export default SingleWish