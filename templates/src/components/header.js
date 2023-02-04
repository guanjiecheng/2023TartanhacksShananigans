import React from "react"
import "../App.css"
import "./header.css"

export default function header(){
    return(
        <div className = "header">
            <img id = "logo" src={require("../images/logo.png")}></img>
            <div className="heading">
                <h1>BRINGING</h1>
                <h1 class="beauty">beauty</h1>
                <h1>TO THE BIDDING</h1>
            </div>
        </div>
    )
}