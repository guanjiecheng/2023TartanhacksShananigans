import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./modal.css";

export const Modal = ({artist, width, height, medium, upperBound, lowerBound, modalHandler}) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      modalHandler(false);
    }
  };
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h3 className="modal-title">Estimated Price Range</h3>
        <button className="close-modal" onClick={() => modalHandler(false)}>X</button>
        <div className="form">
            <h3 className="parameters">{artist}</h3>
            <h6>ARTIST</h6>
        </div>
        <h2 className="upper-limit">{upperBound}</h2>
        <img id = "connect" src={require("../images/connect.png")}></img>
        <h2 className="lower-limit">{lowerBound}</h2>
        
      </div>
    </div>,
    document.getElementById("estimator")
  );
};