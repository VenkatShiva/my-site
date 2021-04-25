import React from 'react';
function StarRating(props) {
    const { rating } = props;
    let stars = [];
    for(let i=1;i<=5;i++){
        // debugger;
        if(rating-i > 0){
            stars.push(
                <span style={{background:`linear-gradient(to right, #ff00bf 0%, #00bcff 100%)`}} className="star" key={'star'+i}>★</span>
            )
        } else if(rating-i > -1){
            let diff = ( rating - i + 1) * 100;
            stars.push(
                <span style={{background:`linear-gradient(to right, #ff00bf 0%, #00bcff ${diff}%, transparent ${diff}% 100%)`}} className="star" key={'star'+i}>★</span>
            )
        } else {
            stars.push(
                <span style={{background:`linear-gradient(to right, trasparent 0% 100%)`}} className="star" key={'star'+i}>★</span>
            )
        }
    }
    return (
        <>
        {stars}
        </>
    )
}

export default StarRating;