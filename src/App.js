import './App.css';

import "leaflet/dist/leaflet.css"

import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";

function App() {

  const [mode, setMode] = useState('search');
  const [latlng, setLatlng] = useState(null);



  function Search() {

    function GetLatLng() {
      useMapEvents({
        click(e) {
          setLatlng(e.latlng)
          setMode('weather')
        }
      })
    }

    function LeafletMap({lat, lng, zoom = 6}) {
      return (
        <MapContainer center={[lat, lng]} zoom={zoom}>
          <TileLayer
            attribution={"&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"}
            url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
          />
          <GetLatLng />
        </MapContainer>
      );
    }

    return (
      <div>
        <div className="text">How's the weather in...</div>

        <LeafletMap lat={"51.097"} lng={"10.558"}/>

        <div className={"text"}>?</div>
      </div>
    );
  }

  function Weather() {

    useEffect(() => {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability&daily=weathercode&timezone=Europe%2FBerlin&forecast_days=3')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
    return (
      <div>

      </div>
    );
  }


  if (mode === "weather") {
    console.log(latlng)
    return (<Weather/>);
  } else {
    return (<Search/>);
  }



}



export default App;
