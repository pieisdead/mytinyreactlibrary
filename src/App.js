import React from 'react';
import './App.css';


import { getBooks, searchBooks, advancedSearch } from './api/get';
import Book from './components/Book';

import AdvancedSearch from './components/AdvancedSearch';
import Modal from './components/Modal';

const App = () => {
    
    const [books, setBooks] = React.useState([]);
    const [loadLimit, setLoadLimit] = React.useState(20);
    const [sort, setSort] = React.useState('date_added');
    const [order, setOrder] = React.useState('ASC');
    const [showWishlist, setShowWishlist] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [term, setTerm] = React.useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);
    const [activeBook, setActiveBook] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [listLength, setListLength] = React.useState(0);
    const [title, setTitle] = React.useState(false);
    const [author, setAuthor] = React.useState(false);
    const [genre, setGenre] = React.useState(false);
    
    React.useEffect(() => {
       if (!title && !author && !genre) {
            getBooks(sort, order, searchTerm).then((books) => {
                setBooks(books);
                setListLength(books.length);
            });
       } else {
           if (searchTerm !== '') {
               advancedSearch(searchTerm, title, author, genre).then((books) => {
                   setBooks(books);
                   setListLength(books.length);
               });
           }
       }
       
    }, [sort, order, searchTerm, title, author, genre]);

    
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
                if (currentScroll >= document.body.offsetHeight - 1000) {
                    if (listLength > loadLimit) {
                        setLoadLimit(loadLimit + 20);
                    }
                }
            }
        
        window.addEventListener('scroll', handleScroll);
    }, [loadLimit, listLength]);
    
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
        setLoadLimit(20);
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
    
    function showAll(e) {
        setSearchTerm('');
        e.preventDefault();
        setLoadLimit(20);
        setTitle(false);
        setAuthor(false);
        setGenre(false);
    }
    
    function changeAdvanced(e) {
        switch (e.target.name) {
            case 'Title':
                setTitle(e.target.value);
                break;
            case 'Author':
                setAuthor(e.target.value);
                break;
            case 'Genre':
                setGenre(e.target.value);
                break;
        }
    }
    
  return (
    <div className="page">
        <Modal bookId={activeBook} show={showModal} closeHandler={closeModal} />
        <header>
            <section>
                <h1><img src="./logo.svg" width="80" alt="MyTinyReactLibrary" /> MyTiny<strong>REACT</strong>Library</h1>
            </section>
            
        </header>
        <div className="search">
            <h4>Find a book</h4>
            <section>
                <input type="text" placeholder="Search books" onChange={changeSearchTerm} />
                <button className="search-button" onClick={handleSearch}><img src="./images/search.svg" width="22" alt="Search" /></button>
            </section>
            <p><a href="#" onClick={handleAdvancedClick}>Advanced search</a></p>
            <AdvancedSearch show={showAdvancedSearch} changeHandler={changeAdvanced} />
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
            <p>Showing <strong>{listLength}</strong> books. <a href="#" onClick={showAll}>Show all</a>.</p>
        </section>
        <div className="books">
            {rows}
        </div>
        <div className="empty" style={listLength === 0 ? {display: 'block'} : {display: 'none'}}>
            <h2>No books found</h2>
        </div>
        <footer>
            <p>A MultiSites Demo site. <a href="">About</a> this project.</p>
        </footer>
    </div>
  );
}

export default App;
