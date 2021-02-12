import React from 'react';
import { getBookById } from '../api/get';
import Spinner from './Spinner';

const Modal = (props) => {

    const [book, setBook] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    
    const wh = document.body.offsetHeight;
    var cScroll = window.scrollY;
    React.useEffect(() => {
        if (props.bookId !== '') {
            setLoading(true);
            getBookById(props.bookId).then((book) => {
                setBook(book[0]);
                setLoading(false);
            });
        }
    }, [props.bookId]);
    
    if (props.show) {
        if (!isLoading) {
            return(
                <div className="overlay" style={{height: wh + 'px'}}>
                    <div className="modal" style={{top: cScroll + 'px'}}>
                        <span className="modal-close" onClick={props.closeHandler}><img src="./images/close.svg" width="18" /></span>
                        <article>
                            <section>
                                <img src={book.cover_art !== '' ? 'http://mytinylibrary.org.za/images/covers/' + book.cover_art : './images/book.svg'} />
                            </section>
                            <section>
                                <h2>{book.title}</h2>
                                <h3>{book.subtitle}</h3>
                                <h5>{book.author_firstname} {book.author_middlename} {book.author_surname}</h5>
                                <p><span className={book.editor !== '' ? '' : 'hidden'}>Editor: {book.editor}</span>
                                    <span className={book.translator !== '' ? '' : 'hidden'}>Translator: {book.translator}</span>
                                    Category: {book.category}<br />
                                    Publisher: {book.publisher}<br />
                                    Published: {book.publish_date}, {book.book_type}<br />
                                    Pages: {book.pages}<br />
                                    ISBN: {book.isbn}
                                </p>
                                <p className="description">{book.description}</p>
                                <p className="tags">{book.tags}</p>
                            </section>
                        </article>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="overlay" style={{height: wh + 'px'}}>
                    <div className="modal" style={{top: cScroll + 'px'}}>
                        <Spinner />
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div></div>
        )
    }
}

export default Modal;