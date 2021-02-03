import React from 'react';
import './App.css';
import { useCookies } from 'react-cookie';

import { getBooks, searchBooks } from './api/get';
import Book from './components/Book';
import Wishlist from './components/Wishlist';
import AdvancedSearch from './components/AdvancedSearch';
import Modal from './components/Modal';

const App = () => {
    
    const [cookie, setCookie] = useCookies(['ids']);
    const [books, setBooks] = React.useState([]);
    const [loadLimit, setLoadLimit] = React.useState(20);
    const [sort, setSort] = React.useState('date_added');
    const [order, setOrder] = React.useState('ASC');
    const [wishlist, setWishList] = React.useState([cookie.ids]);
    const [showWishlist, setShowWishlist] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [term, setTerm] = React.useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);
    const [activeBook, setActiveBook] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    
    React.useEffect(() => {
       if (cookie.length === 0) {
            setCookie('ids', '', {path: '/'});
       }
        getBooks(sort, order, searchTerm).then((books) => {
            setBooks(books);
        });
       
    }, [sort, order, searchTerm]);

    
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll >= document.body.offsetHeight - 1000) {
                setLoadLimit(loadLimit + 20);
            }
        }
        window.addEventListener('scroll', handleScroll);
    }, [loadLimit]);
    
    const rows = books.map((book, i) => {
        if (i < loadLimit) {
            return <Book key={i} book={book} openHandler={() => {bookClick(book.uid)}} />;
        }
    });
    
    function handleSortChange(e) {
        setSort(e.target.value);
    }
    
    function handleOrderChange(e) {
        setOrder(e.target.value);
    }
    
    function showHideWishlist() {
        setShowWishlist(wishlist => !wishlist);
        document.getElementById('wishBtn').classList.toggle('active');
    }
    
    function changeSearchTerm(e) {
       setTerm(e.target.value);
        
    }
    
    function handleSearch() {
        setSearchTerm(term);
    }
    
    function handleAdvancedClick(e) {
        setShowAdvancedSearch(showAdvancedSearch => !showAdvancedSearch);
        e.preventDefault();
    }
    
    function bookClick(bid) {
        setActiveBook(bid);
        setShowModal(true);
    }
    
    function closeModal() {
        setShowModal(false);
    }
    
  return (
    <div className="page">
        <Modal bookId={activeBook} show={showModal} closeHandler={closeModal} />
        <header>
            <section>
                <h1><img src="./logo.svg" width="80" alt="MyTinyReactLibrary" /> MyTiny<strong>REACT</strong>Library</h1>
            </section>
            <section>
                <div className="wish-button" id="wishBtn" onClick={showHideWishlist}>
                    <span>Your wishlist</span> <img src="./images/star-on.svg" width="30" alt="Wish" />
                </div>
                <Wishlist list={wishlist} show={showWishlist} />
            </section>
        </header>
        <div className="search">
            <h4>Find a book</h4>
            <section>
                <input type="text" placeholder="Search books" onChange={changeSearchTerm} />
                <button className="search-button" onClick={handleSearch}><img src="./images/search.svg" width="22" alt="Search" /></button>
            </section>
            <p><a href="" onClick={handleAdvancedClick}>Advanced search</a></p>
            <AdvancedSearch show={showAdvancedSearch} />
        </div>
        <section className="book-nav">
            <label>Sort by</label>
            <select onChange={handleSortChange}>
                <option value="date_added">Date added</option>
                <option value="title">Title</option>
                <option value="author_surname">Author name</option>
                <option value="category">category</option>
            </select>
            <select onChange={handleOrderChange}>
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
            </select>
        </section>
        <div className="books">
            {rows}
        </div>
        <footer>
            <p>A MultiSites Demo site. <a href="">About</a> this project.</p>
        </footer>
    </div>
  );
}

export default App;
