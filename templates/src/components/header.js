import React from "react"
import "../App.css"
import "./header.css"

export default function header(){
    return(
        <div className = "header">
            <img id = "logo" src={require("../images/logo.png")}></img>
        </div>
    )
}