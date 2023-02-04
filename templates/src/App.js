import { useState, useEffect } from 'react'
// import axios from "axios";
// import logo from './logo.svg';
import './App.css';
import '/'
import Header from "./components/header"
import Estimator from "./components/estimator"
import Vis from "./components/datavis"
import Bars from "./components/vistwo"
import Dots from "./components/finalvis"

function App() {
   // new line start
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    // setProfileData(({
    //   profile_name: "ben",
    //   about_me: "is student"}))
    fetch("/profile").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setProfileData({
                    name: data.name,
                    about: data.about,
                });
            })
    );
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Estimator/>
      </header>
      <h3 id = "dataVisIntro">VIEW THE PAST AND PREDICT THE FUTURE</h3>
      <Dots/>
      <h5 id = "dotsText">The global market for art has been expanding. Understanding trends behind mediums can get you ahead of the pack</h5>
      <Vis/>
      <h5 id = "priceText">While artwork can cost in the millions, past trends show there's something for all wallet sizes </h5>
      <Bars/>
      <h5 id = "mediumText">Some media formats are more popular than others... Stay Alert!</h5>
      <p id = "slay">"what code brain empty only slay"</p>
    </div>
  );
}

export default App;