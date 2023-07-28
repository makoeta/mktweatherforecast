import './App.css';

import "leaflet/dist/leaflet.css"

import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import {useState} from "react";
import {MarkerProps} from "react-leaflet";

function App() {


  function GetLatLng() {
    const [latlng, setLatlng] = useState(null);

    useMapEvents({
      click(e) {
        setLatlng(e.latlng)
        alert("Location set to: " + latlng)

      }
    })
  }

  function Search() {
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


  let mode = "search"

  if (mode === "search") {
    return (<Search/>);
  }



}



export default App;
