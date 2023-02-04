import React, { useState } from 'react';
import "../App.css"
import "./estimator.css"
import MediumSelect from "./mediumSelect";

export default function Estimator(){
    const mediums = ['Oil on Canvas','Work on Paper', 'Print', 'Watercolor', 'Mixed Media', 'Acrylic', 'Graphite/Pencil', 'Lithograph','Scroll', 'Others'];
    
    function getIds(){
        let medium = [];
         for(var i = 0; i < mediums.length; i++){
             medium.push({medium:mediums[i], selected:false});
         }
         return medium;
    }

    const [mediumIds, setMediumIds] = useState(getIds());
    const [selectedMed, setSelectedMed] = useState(null);

    const mediumSelected = (idx, selected) => {
        let newMediums = getIds();
        newMediums[idx].selected = selected;
        setMediumIds(newMediums);
        if(selected){setSelectedMed(newMediums[idx].medium);}
        else{setSelectedMed(null);}
    }

    function submitButton(){
        var artist = document.getElementById('artist-name').value
        var width = document.getElementById('width-input').value
        var medium = selectedMed
        var height = document.getElementById('height-input').value
    }

    return ( <div className = "estimator">
            <h3>SEE FUTURE TRENDS... BEFORE THEY OCCUR</h3>
            <input type = "search" id = "artist-name" placeholder="SEARCH BY ARTIST NAME" required></input>
            <div className="medium">
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
            <button id="submit-button" type = "button" onClick = {submitButton}>ESTIMATE</button>
        </div>
    )
}