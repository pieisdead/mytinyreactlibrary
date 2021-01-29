import React from 'react';
import './App.css';

import { getBooks } from './api/get';
import Book from './components/Book';
import Wishlist from './components/Wishlist';

const App = () => {
    
    const [books, setBooks] = React.useState([]);
    const [loadLimit, setLoadLimit] = React.useState(20);
    const [sort, setSort] = React.useState('date_added');
    const [order, setOrder] = React.useState('ASC');
    const [wishlist, setWishList] = React.useState([]);
    const [showWishlist, setShowWishlist] = React.useState(false);
    
    React.useEffect(() => {
       getBooks(sort, order).then((books) => {
          setBooks(books);
       })
    }, [sort, order]);
    
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll >= document.body.offsetHeight - 1000) {
                setLoadLimit(loadLimit + 20);
            }
        }
        window.addEventListener('scroll', handleScroll);
    }, [loadLimit])
    
    const rows = books.map((book, i) => {
        if (i < loadLimit) {
            return <Book key={i} book={book} />;
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
    
  return (
    <div className="page">
        <header>
            <section>
                <h1><img src="./logo.svg" width="80" alt="MyTinyReactLibrary" /> MyTiny<strong>REACT</strong>Library</h1>
            </section>
            <section>
                <div className="wish-button" id="wishBtn" onClick={showHideWishlist}>
                    <span>Your wishlist</span> <img src="./images/star-on.svg" width="30" />
                </div>
                <Wishlist list={wishlist} show={showWishlist} />
            </section>
        </header>
        <div className="search">
            <h4>Find a book</h4>
            <section>
                <input type="text" placeholder="Search books" />
                <button className="search-button"><img src="./images/search.svg" width="22" /></button>
            </section>
            <p><a href="">Advanced search</a></p>
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
            <p>A MultiSites Demo site</p>
        </footer>
    </div>
  );
}

export default App;
