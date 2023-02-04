import React from "react"
import "../App.css"
import "./estimator.css"

export default function estimator(){
    const mediums = ['Oil on Canvas','Acrylic', 'Chalk', 'Watercolor', 'Mixed Media', 'Etching', 'Graphite', 'Digital','Photography', 'Others']
    return(
        <div className = "estimator">
            <h3>SEE FUTURE TRENDS... BEFORE THEY OCCUR</h3>
            <input type = "search" id = "artist-name"></input>
            <div>
                <h5>MEDIUM</h5>
            </div>
            <div>
                <h5>SIZE</h5>
                <input type = "search" id = "width-input"></input>
                <input type = "search" id = "height-input"></input><br></br><br></br>
                <label for = "width-input">WIDTH</label>
                <label for = "height-input">HEIGHT</label>
            </div>
            <button>ESTIMATE</button>
        </div>
    )
}