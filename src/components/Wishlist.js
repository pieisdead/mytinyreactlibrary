import React from 'react';



const Wishlist = (props) => {
    
    const list = props.list.map((item, i) => {
        return (
            <section>
                <p>Anna Kerinina</p>
                <p>Leo Tolstoy</p>
                <span className="delete"><img src="./images/delete.svg" width="20" /></span>
            </section>
        )
    });
    
    if (list.length > 0) {
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