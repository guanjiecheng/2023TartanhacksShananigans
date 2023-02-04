import React, { useState, useEffect } from 'react';
import "../App.css"
import "./estimator.css"
import MediumSelect from "./mediumSelect";
import ResultShow from "./results";
import Papa from "papaparse";
import ArtData from "./artdata.csv";

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
    const[artist, setArtist] = useState(null);
    const[width, setWidth] = useState(null);
    const[height, setHeight] = useState(null);
    const[medium, setMedium] = useState(null);
    const[estimateClicked, setEstimateClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const mediumSelected = (idx, selected) => {
        let newMediums = getIds();
        newMediums[idx].selected = selected;
        setMediumIds(newMediums);
        if(selected){setMedium(newMediums[idx].medium);}
        else{setMedium(null);}
    }

    // const [submitted, SetSubmitted] = useState(false);
    function submitButton(){
        setArtist(document.getElementById('artist-name').value);
        setWidth(document.getElementById('width-input').value);
        setHeight(document.getElementById('height-input').value);
        setEstimateClicked(true);
    }
    // modal

    useEffect(()=>{
        setShowModal(estimateClicked);
    }, [estimateClicked])

    const modalOpenClose = (open) => {
        setShowModal(open);
        if(!open){setEstimateClicked(false);}
    }

    const [parsedData, setParsedData] = useState([]);
         
    // Event listener on reader when the file
    // loads, we parse it and set the data.
        // Passing file data (event.target.files[0]) to parse using Papa.parse
    useEffect(()=>{
        const fetchData = async () => {
            Papa.parse(ArtData, {
                header: true,
                download: true,
                delimiter: ",",
                complete: ((result) => {
                    setParsedData((result.data.map(d => (
                        {artist: d.Artist,
                        price: d.Price}))))
                    
                })
        })}
        fetchData();
    }, [])

    return ( <div className = "estimator" id="estimator">
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
            {showModal && <ResultShow artist={artist} width={width} height={height} medium={medium} showModal={showModal} modalHandler={modalOpenClose} parsedData={parsedData}/>}
        </div>
    )
}