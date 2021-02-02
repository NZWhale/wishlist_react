import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { StateInterface, User } from '../../types';
import Header from '../Header';
import WishesBlock from '../WishesBlock';
import EmptyWishComponent from '../WishesBlock/EmptyWishComponent';
import NewWishModal from './NewWishModal';



interface AddWishesBlockProps {
    users: Array<User>
    loggedInUser: {
        username: string
        id: string
    }
}

class AddWishesBlock extends React.Component<AddWishesBlockProps> {
    state = { activeIndex: 0 }

    handleClick = (e: any, titleProps: any) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { users, loggedInUser } = this.props
        let currentUser: any
        users.find((user, index) => { if (user.id === loggedInUser.id) currentUser = users[index] })
        return (
            <>
                <Header activeItem={"Wishes"} />
                <NewWishModal loggedInUser={loggedInUser.username} />
                <Segment >
                    {currentUser.wishes.length > 0 ? <WishesBlock wishes={currentUser.wishes} isLoggedInUser={true} /> : <EmptyWishComponent />}
                </Segment>

            </>
        )
    }
}


const mapStateToProps = (state: StateInterface): AddWishesBlockProps => ({
    users: state.users,
    loggedInUser: state.loggedInUser
})

export default connect(mapStateToProps)(AddWishesBlock)