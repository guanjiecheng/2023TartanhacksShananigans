import React from 'react';
import "../App.css"
import "./estimator.css"

export default function MediumSelect({medium, display, idx, selectHandler}){
    function onClickHandler(){
        selectHandler(idx, !display);
        return;
    }
    return(
        <button onClick={onClickHandler} className={display ? 'selectedButton': null} >
            {medium}
        </button>
    )
}