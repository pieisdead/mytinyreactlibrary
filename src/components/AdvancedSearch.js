import { useSpring, animated} from 'react-spring';

const AdvancedSearch = (props) => {
    
    const height = props.show ? 50 : 0;
    
    if (props.show) {
        return (
            <div className="advanced" style={{height: height + 'px'}}>
                <select>
                    <option>Any title</option>
                </select>
                <select>
                    <option>Any author</option>
                </select>
                <select>
                    <option>Any genre</option>
                </select>
            </div>
        )
    } else {
        return <div></div>
    }
    
}

export default AdvancedSearch;