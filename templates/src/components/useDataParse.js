// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";
// import ArtData from "./artdata.csv";
 
// function Parse(){
//     // This state will store the parsed data
//     const [parsedData, setParsedData] = useState([]);
         
//     // Event listener on reader when the file
//     // loads, we parse it and set the data.
//         // Passing file data (event.target.files[0]) to parse using Papa.parse
//     useEffect(()=>{
//         const fetchData = async () => {
//             Papa.parse(ArtData, {
//                 header: true,
//                 download: true,
//                 delimiter: ",",
//                 complete: ((result) => {
//                     setParsedData((result.data.map(d => (
//                         {artist: d.Artist,
//                         price: d.Price}))))
                    
//                 })
//         })}
//         fetchData();
//     }, [])

//     console.log(parsedData);
//     return parsedData;
// };
    