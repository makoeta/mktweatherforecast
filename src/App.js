import './App.css';

import "leaflet/dist/leaflet.css"

import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import axios from "axios";
import useFetch from "./useFetch";
import {LatLng} from "leaflet/src/geo";

function App() {

  const [mode, setMode] = useState('search');
  const [latlng, setLatlng] = useState(new LatLng(0, 0));
  const [weatherData, setWeatherData] = useState([])

  const {data, loading, error} = useFetch("https://api.open-meteo.com/v1/forecast?latitude=" + latlng.lat + "&longitude=" + latlng.lng
    + "&hourly=temperature_2m,precipitation_probability&forecast_days=3")

  if (loading) return <h1>Loading</h1>
  if (error) console.log(error)

  function getData() {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + latlng[0] + "&longitude=" + latlng[1] + "&hourly=temperature_2m,precipitation_probability&forecast_days=3";
    return fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setWeatherData(res)
        console.log(res)
        console.log("url: " + apiUrl)
        console.log("latlng: " + latlng)
      })
      .catch((err) => {
        console.log(err.message)
      });
  }


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
    const test = latlng
    console.log("TEST: " + test.lat)

    function onClickBack() {
      setMode("search")
    }

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
            data.hourly.time.map((item, index) => {
              item = item.replace('T', ' at ');
              return (
                <tr key={index}>
                  <td>{item}</td>
                  <td>{data.hourly.temperature_2m[index]} °C</td>
                  <td>{data.hourly.precipitation_probability[index]} %</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>

        <a>Weather data for {latlng.toString()}</a>
      </>

    );
  }


  //return depending on mode

  if (mode === "weather") {
    return (<Weather/>);
  } else {
    return (<Search/>);
  }


}


export default App;
