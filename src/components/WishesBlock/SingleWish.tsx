import * as React from 'react';
import { Wish } from '../../types';
import noImage from '../../images/noImage.jpg';
import { Item } from 'semantic-ui-react';


interface SingleWishProps {
    wish: Wish
}

class SingleWish extends React.Component<SingleWishProps> {
    render() {
        return (
            <>
                {/* <div>
                    <img style={{ width: '90px' }}
                        src={this.props.wish.image ? this.props.wish.image : noImage}></img><div>{this.props.wish.title ? this.props.wish.title : "null"}</div>
                    <div>{this.props.wish.url ? this.props.wish.url : "null"}</div>
                    <div>{this.props.wish.comment ? this.props.wish.comment : "null"}</div>
                </div> */}
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={this.props.wish.image ? this.props.wish.image : noImage} />
                        <Item.Content>
                            <Item.Header as='string'>{this.props.wish.title ? this.props.wish.title : "null"}</Item.Header>
                            <Item.Description>
                                {this.props.wish.comment ? this.props.wish.comment : "null"}
                            </Item.Description>
                            <Item.Extra src={this.props.wish.url ? this.props.wish.url : "null"}>{this.props.wish.url ? this.props.wish.url : "null"}</Item.Extra>
                        </Item.Content>
                    </Item>
                    </Item.Group>
            </>
        )
    }
}

export default SingleWish