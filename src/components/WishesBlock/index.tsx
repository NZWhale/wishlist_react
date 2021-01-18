import * as React from 'react';
import { Item } from 'semantic-ui-react';
import { Wish } from '../../types';
import Header from '../Header';
import SingleWish from './SingleWish';

interface WishesBlockProps {
    wishes: Array<Wish>
}

class WishesBlock extends React.Component<WishesBlockProps> {
    render() {
        const wishesList = this.props.wishes.map((wish: Wish) =>
            <SingleWish wish={wish} />
            )
        return(
            <>
                {wishesList}
            </>
        )
    }
}

export default WishesBlock