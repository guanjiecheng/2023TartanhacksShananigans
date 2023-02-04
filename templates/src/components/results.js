import React from "react";
import "../App.css";
import "./modal.css";
import { Modal } from "./modal";

export default function ResultShow({artist, width, height, medium, showModal, modalHandler}) {
    console.log('here')
    return (
        <div className="overlay">
            {showModal ? <Modal artist={artist} width={width} height={height} medium={medium} modalHandler={modalHandler} /> : null}
            
        </div>
    )
}