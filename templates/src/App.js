import { useState, useEffect } from 'react'
// import axios from "axios";
// import logo from './logo.svg';
import './App.css';
import Header from "./components/header"

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
  })
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        {/* new line start*/}
        <p>To get your profile details: </p>
        {profileData && <div>
              <p>Profile name: {profileData.name}</p>
              <p>About me: {profileData.about}</p>
            </div>
        }
         {/* end of new line */}
      </header>
    </div>
  );
}

export default App;