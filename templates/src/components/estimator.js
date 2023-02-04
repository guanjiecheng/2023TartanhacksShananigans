import React, { useState, useEffect } from 'react';
import "../App.css"
import "./estimator.css"
import MediumSelect from "./mediumSelect";

export default function Estimator(){
    const mediums = ['Oil on Canvas','Acrylic', 'Chalk', 'Watercolor', 'Mixed Media', 'Etching', 'Graphite', 'Digital','Photography', 'Others'];
    
    function getIds(){
        let medium = [];
         for(var i = 0; i < mediums.length; i++){
             medium.push({medium:mediums[i], selected:false});
         }
         return medium;
    }

    const [mediumIds, setMediumIds] = useState(getIds());

    const mediumSelected = (idx, selected) => {
        let newMediums = getIds();
        newMediums[idx].selected = selected;
        console.log(newMediums);
        setMediumIds(newMediums);

    }

    return(
        <div className = "estimator">
            <h3>SEE FUTURE TRENDS... BEFORE THEY OCCUR</h3>
            <input type = "search" id = "artist-name" placeholder="SEARCH BY ARTIST NAME"></input>
            <div>
                <h5>MEDIUM</h5>
                <div className="mediums">
                    {mediumIds.map((medium, idx) => {
                        return <MediumSelect medium={medium.medium} display={medium.selected} idx={idx} selectHandler={mediumSelected}/>
                    })}
                </div>
            </div>
            <div className="size">
                <h5>SIZE</h5>
                <input type = "search" id = "width-input" placeholder="WIDTH"></input>
                <input type = "search" id = "height-input" placeholder="HEIGHT"></input><br></br><br></br>
            </div>
            <button id="submit-button">ESTIMATE</button>
        </div>
    )
}