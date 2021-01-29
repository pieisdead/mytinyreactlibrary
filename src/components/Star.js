

const Star = (props) => {
    
    if (props.on) {
        return <i className="star" onClick={props.clickHandler}><img src="./images/star-on.svg" width="30" /></i>
    } else {
        return <i className="star" onClick={props.clickHandler}><img src="./images/star-off.svg" width="30" /></i>
    }
}

export default Star;