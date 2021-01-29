import React from 'react';
import { useSpring, animated } from 'react-spring';

import Star from './Star';

const Book = (props) => {
    
    const [added, setAdded] = React.useState(false);
    
    const limit = 100;
    const truncatedDescription = props.book.description.substr(0, limit);
    const spring = useSpring({transform: 'scale(1)', from: {transform: 'scale(0)'}});
    
    function handleClick(bid) {
        setAdded(added => !added);
    }
    
    return (
        <div className="book">
            <animated.div style={spring}>
                <Star on={added} clickHandler={() => { handleClick(props.book.uid)}} />
                <img src={props.book.cover_art !== '' ? './images/covers/' + props.book.cover_art : './images/book.svg'} />
                <h2>{props.book.title}</h2>
                <h3>{props.book.author_firstname} {props.book.author_surname}</h3>
                <p>{truncatedDescription}</p>
                <button>View book</button>
            </animated.div>
        </div>
    )
}

export default Book;