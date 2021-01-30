import React from 'react';
import { getBookById } from '../api/get';


const Wishlist = (props) => {
    
    const [books, setBooks] = React.useState([]);
    
    React.useEffect(() => {
        if (props.list.length > 0) {
            props.list.map((b, i) => {
                getBookById(b).then((book) => {
                     setBooks((prevState) => ({
                       ...prevState,
                       [i]: book
                    }));
                });
            }) 
        }
    }, [props.list]);
    console.log(books)
    var list = props.list;
    if (books.length > 0) {
        list = books.map((book, i) => {
            return (
                <section key={i}>
                    <p>{book.title}</p>
                    <p>{book.author_firstname} {book.author_surname}</p>
                    <span className="delete"><img src="./images/delete.svg" width="20" /></span>
                </section>
            )
        });
    }
    if (books.length > 0) {
        if (props.show) {
            return (
                <div className="wishlist">
                    {list}
                </div>
            )
        } else {
            return <div></div>;
        }
    } else {
        if (props.show) {
            return <div className="wishlist"><section><p>Your wishlist is empty</p></section></div>;
        } else {
            return <div></div>
        }
    }
    
}

export default Wishlist;