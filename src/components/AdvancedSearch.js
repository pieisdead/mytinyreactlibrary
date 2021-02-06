
const AdvancedSearch = (props) => {
    
    const height = props.show ? 50 : 0;
    
    if (props.show) {
        return (
            <div className="advanced" style={{height: height + 'px'}}>
                <select onChange={props.changeHandler} name="Title">
                    <option value={false}>Any title</option>
                    <option value={true}>This title</option>
                </select>
                <select onChange={props.changeHandler} name="Author">
                    <option value={false}>Any author</option>
                    <option value={true}>This author</option>
                </select>
                <select onChange={props.changeHandler} name="Genre">
                    <option value={false}>Any genre</option>
                    <option value={true}>This genre</option>
                </select>
            </div>
        )
    } else {
        return <div></div>
    }
    
}

export default AdvancedSearch;