import './App.css';

import "leaflet/dist/leaflet.css"

import {MapContainer, TileLayer} from "react-leaflet";


function LeafletMap() {
  return (
    <MapContainer center={[52.520008, 13.404954]} zoom={13}>
      <TileLayer
        attribution={"© OpenStreetMap"}
        url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
      />
    </MapContainer>
  );
}

function Search() {
  return (
    <div>
      <div className="text">How's the weather in...</div>

      <LeafletMap/>

      <div className={"text"}>?</div>
    </div>
  );
}





function App() {

  let mode = "search"

  if (mode === "search") {
    return (<Search/>);
  }



}



export default App;
