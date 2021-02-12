import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useCookies } from 'react-cookie';



const Book = (props) => {
    
    const [added, setAdded] = React.useState(false);
    const [cookie, setCookie] = useCookies(['ids']);
    const limit = 100;
    const truncatedDescription = props.book.description.substr(0, limit);
    const spring = useSpring({transform: 'scale(1)', from: {transform: 'scale(0)'}});
    
    function handleClick(bid) {
        setAdded(added => !added);
        const carray = [];
        if(cookie.length > 0) {
            carray = cookie.split(',');
        } 
        carray.push(bid);
        setCookie('ids', carray.toString(), {path: '/'});
    }
    
    return (
        <div className="book">
            <animated.div style={spring}>
                
                <img src={props.book.cover_art !== '' ? 'http://mytinylibrary.org.za/images/covers/' + props.book.cover_art : './images/book.svg'} alt={props.book.title + ' by ' + props.book.author_firstname + ' ' + props.book.author_surname} />
                <h2>{props.book.title}</h2>
                <h3>{props.book.author_firstname} {props.book.author_surname}</h3>
                <p className="pull">{props.book.category}</p>
                <p>{truncatedDescription}...</p>
                <button onClick={props.openHandler}>View book</button>
            </animated.div>
        </div>
    )
}

export default Book;