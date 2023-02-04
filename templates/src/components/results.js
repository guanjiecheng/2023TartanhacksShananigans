import React, {useState, useEffect} from "react";
import "../App.css";
import "./modal.css";
import { Modal } from "./modal";

export default function ResultShow({artist, width, height, medium, showModal, modalHandler, parsedData}) {

    const [artistData, setArtistData] = useState([]);
    const [mapArtistData, setMapArtistData] = useState([]);
    const [artistDataNew, setArtistDataNew] = useState([]);
    const [upperBound, setUpperBound] = useState(0);
    const [lowerBound, setLowerBound] = useState(0);

    useEffect(()=>{
        setArtistData(parsedData.filter(function(item)
        {
            return item.artist == artist.toUpperCase()+" " || item.artist == artist.toUpperCase();
        }));
    }, [parsedData])

    useEffect(()=>{
        setMapArtistData(artistData.map((item) => parseInt(item.price)));
    }, [artistData])

    useEffect(()=>{
        setArtistDataNew(mapArtistData.filter(function(item)
        {
            return (typeof item == "number") && item != undefined && item!=0;
        }))
    }, [mapArtistData])

    useEffect(()=>{
        const upperBound = () => {
            var curMax = 0;
            for(let i = 0; i<artistDataNew.length; i++){
                if (typeof artistDataNew[i] == "number" && artistDataNew[i]>curMax){
                    curMax = artistDataNew[i]
                }
            }
            return curMax;
        }
        setUpperBound(upperBound());
    }, [artistDataNew])

    useEffect(()=>{
        const lowerBound = () => {
            var sum = 0;
            for(let i = 0; i<artistDataNew.length; i++){
                if (typeof artistDataNew[i] == "number"){
                    sum += artistDataNew[i]
                }
            }
            return Math.floor(sum/artistDataNew.length+1);
        }
        setLowerBound(lowerBound());
    }, [artistDataNew])


    const handleModal = (open) =>{
        modalHandler(open);
        setArtistData([]);
        setMapArtistData([]);
        setArtistDataNew([]);
        setUpperBound(0);
        setLowerBound(0);
    }
    console.log(artistDataNew);
    return (
        <div className="overlay">
            {showModal ? <Modal artist={artist.toUpperCase()} width={width} height={height} medium={medium} upperBound={upperBound} lowerBound={lowerBound} modalHandler={handleModal} /> : null}

        </div>
    )
}