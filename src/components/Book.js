
const Book = (props) => {
    
    return (
        <div className="book">
            <img src={'./images/covers/' + props.book.cover_art} />
            <h2>{props.book.title}</h2>
            <h3>{props.book.author_firstname} {props.book.author_surname}</h3>
            <p>{props.book.description}</p>
            <button>More</button>
        </div>
    )
}

export default Book;