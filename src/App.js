import './App.css';

import "leaflet/dist/leaflet.css"

import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";

function App() {

  const [mode, setMode] = useState('search');
  const [latlng, setLatlng] = useState(null);
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => { // get weather data from API
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability&daily=weathercode&timezone=Europe%2FBerlin&forecast_days=3")
      .then((res) => res.json())
      .then((res) => {
        setWeatherData(res)
        console.log(res)
      })
  }, []);


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
          <GetLatLng/>
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

    function onClickBack() {
      setMode("search")
    }

    console.log(weatherData.hourly.time)


    return (
      <>
        <button className={"backButton"} onClick={onClickBack}>Back</button>

        <table>
          <thead>
          <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Probability of Rain</th>
          </tr>
          </thead>
          <tbody>
          {
            weatherData.hourly.time.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </>

    );
  }


  if (mode === "weather") {
    return (<Weather/>);
  } else {
    return (<Search/>);
  }


}


export default App;
