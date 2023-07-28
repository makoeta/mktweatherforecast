import './App.css';

function Search() {
  return (
    <div>
      <div className="text">How's the weather in...</div>

      <input className="searchbar" placeholder={"Your location"}></input>

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
