import logo from './logo.svg';
import Meteo from './Meteo'
import React from 'react';
import './App.css';

function App() {
  const [dataMeteo, setDataMeteo]=React.useState([])

  React.useEffect(
    ()=>{
      async function getMeteo(){
        const res = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=48.824&lon=2.272&units=metric&appid=841d265f73d5561b6f1ed02c18cc2a9d')

        const data = await res.json()
        setDataMeteo(
          {temperature:data.current.temp,
            nuage: data.current.weather[0].main
          })
          console.log(data)
      }
      getMeteo()
    }
  ,[])
  console.log(dataMeteo)
  return (
    <div className="App">
      <header className="App-header">
<h1>Application météo</h1>
      </header>
     <Meteo nuage={dataMeteo.nuage} temperature={dataMeteo.temperature}/>
    </div>
  );
}

export default App;
