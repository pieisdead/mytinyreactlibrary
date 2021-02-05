import React from 'react';

const Spinner = () => {
    
    React.useEffect(() => {
        var spinner = document.getElementById('Spinner');
        var i = 0;
        var t = setInterval(function() {
            var s = spinner.getElementsByTagName('span')[i];
            var p = i > 0 ? i - 1 : 3;
            var pr = spinner.getElementsByTagName('span')[p];
            s.style.transform = 'scale(1.2, 1.2)';
            pr.style.transform = 'scale(1, 1)';
            if (i < 3) {
             i++;   
            } else {
                i = 0;
            }
        }, 300);
    });
    
    return (
        <div className="spinner" id="Spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default Spinner;