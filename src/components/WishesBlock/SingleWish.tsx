import * as React from 'react';
import { StateInterface, Wish } from '../../types';
import noImage from '../../images/noImage.jpg';
import { Button, Item, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteWishUrl } from '../../utils';
import store from '../../store/store';
import setUsersAction from '../../store/actionCreators/setUsersAction';
import { Link } from 'react-router-dom';


interface SingleWishProps {
    wish: Wish
    isLoggedInUser: boolean
}

interface PropsFromState {
    loggedInUser: {
        username: string;
        id: string;
    }
}

class SingleWish extends React.Component<SingleWishProps & PropsFromState> {
    render() {
        const { isLoggedInUser, loggedInUser } = this.props
        const { id, image, title, url, comment } = this.props.wish
        return (
            <>
                <Segment vertical>
                    <Item.Group>
                        <Item id={id}>
                            <Item.Image size='tiny' src={image ? image : noImage} />
                            <Item.Content>
                                <Item.Header as=''>{title ? title : "null"}</Item.Header>
                                <Item.Description>
                                    {comment ? comment : "null"}
                                </Item.Description>
                                <Item.Extra><Link to={url ? url : "null"}>{url ? url : "null"}</Link></Item.Extra>
                                {isLoggedInUser &&
                                    <>
                                        <Button style={{marginTop:"10px"}} 
                                                basic 
                                                size="mini" 
                                                color="red" 
                                                icon="remove"
                                                onClick={() => {
                                                    fetch(deleteWishUrl, {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        user: loggedInUser,
                                                        id: id,
                                                    }),
                                                    headers: {"Content-Type": "application/json"},
                                                }).then(response => response.json())
                                                .then(data => store.dispatch(setUsersAction(data)))
                                            }}/> 
                                    </>
                                }
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    loggedInUser: state.loggedInUser,
})

export default connect(mapStateToProps)(SingleWish)