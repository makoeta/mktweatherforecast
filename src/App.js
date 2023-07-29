import './App.css';

import "leaflet/dist/leaflet.css"

import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import {useState} from "react";
import useFetch from "./useFetch";
import {LatLng} from "leaflet/src/geo";
import {Line, LineChart, XAxis, YAxis} from "recharts";

function App() {

  const [mode, setMode] = useState('search');
  const [latlng, setLatlng] = useState(new LatLng(0, 0));

  const {data, loading, error} = useFetch("https://api.open-meteo.com/v1/forecast?latitude=" + latlng.lat + "&longitude=" + latlng.lng
    + "&hourly=temperature_2m,precipitation_probability&forecast_days=3")

  if (loading) return <h1>Loading</h1>
  if (error) console.log(error)



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

    const tempData = data.hourly.temperature_2m.map(x => ({temp: x}))

    return (
      <>
        <button className={"backButton"} onClick={onClickBack}>Back</button>

        <LineChart width={400} height={400} data={tempData}>
          <Line type={"monotone"} dataKey={"temp"} stroke={"#8884d8"}/>
        </LineChart>

        <div className={"infotext"}> Weather data for <a className={"inforef"} href={"https://www.openstreetmap.org/#map=14/" + latlng.lat + "/" + latlng.lng} target={"_blank"}>{latlng.lat}/{latlng.lng}</a>.</div>
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
