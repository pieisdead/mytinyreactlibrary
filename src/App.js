import React from 'react';
import './App.css';

import { getBooks } from './api/get';
import Book from './components/Book';

const App = () => {
    
    const [books, setBooks] = React.useState([]);
    
    React.useEffect(() => {
        setBooks([]);
       getBooks().then((books) => {
          setBooks(books);
       })
    }, []);
    
    const rows = books.map((book, i) => {
        return <Book key={i] book={book} />;
    })
    
  return (
    <div className="page">
        <header>
            <section>
                <h1><img src="./logo.svg" width="80" alt="MyTinyReactLibrary" /> MyTiny<strong>REACT</strong>Library</h1>
            </section>
        </header>
        <div className="search">
            <h4>Find a book</h4>
            <input type="text" placeholder="Search books" />
            <p><a href="">Advanced search</a></p>
        </div>
        <div className="books">
            <div className="book-nav">
                <label>Sort by</label>
                <select>
                    <option value="date_added">Date added</option>
                </select>
            </div>
            {rows}
        </div>
        <footer>
            <p>A MultiSites Demo site</p>
        </footer>
    </div>
  );
}

export default App;
