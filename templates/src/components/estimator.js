import React from "react"
import "../App.css"
import "./estimator.css"

export default function estimator(){
    const mediums = ['Oil on Canvas','Acrylic', 'Chalk', 'Watercolor', 'Mixed Media', 'Etching', 'Graphite', 'Digital','Photography', 'Others']
    return(
        <div className = "estimator">
            <h3>SEE FUTURE TRENDS... BEFORE THEY OCCUR</h3>
            <input type = "search" id = "artist-name"></input>
            <h5>MEDIUM</h5>
            <div>

            </div>
        </div>
    )
}