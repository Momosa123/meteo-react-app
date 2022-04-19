import React from 'react';
import Meteo from './Meteo'
import DailyMeteo from './DailyMeteo'

function App() {
  const [currentMeteo, setcurrentMeteo]=React.useState([])
  const [dailyTemp, setDailyTemp]=React.useState([])
  const [ville, setVille]=React.useState("")
  const [isSubmitted, setIsSubmitted]=React.useState(false)
  const [clicked, setClicked]=React.useState(0)
  
  // const [coordGeo, setCoordGeo]=React.useState(
  //   {lat:0,
  //     lon:0

  // })
  React.useEffect(
    ()=>{//Afficher la meteo de la ville où nous sommes 
     if(!isSubmitted){navigator.geolocation.getCurrentPosition(async function getMeteo(position){
      
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=e74a92d119ed5997e75aba26772a14e6`)
        if (!res.ok)
        throw new Error(`Country not found (${res.status})`);
        const data = await res.json()
        .catch((err) => console.log(`${err} 💥💥💥`))
        setcurrentMeteo(
          {temperature:data.current.temp,
            nuage: data.current.weather[0].main,
            icon:  data.current.weather[0].icon
          }) 
          console.log(data)
       
          const resv = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=e74a92d119ed5997e75aba26772a14e6`)
          const datav = await resv.json()
          // console.log(datav)
          setVille(datav[0].name)
          if (currentMeteo){
            setIsSubmitted(true)  
            setClicked(value=> value+1)
          }
      })}
      else{
        async function getMeteo(){
          const resv = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ville}&limit=5&appid=e74a92d119ed5997e75aba26772a14e6`)
          if (!resv.ok)
          throw new Error(`Country not found (${resv.status})`);
          const datav = await resv.json()
          .catch((err) => console.log(`${err} 💥💥💥`))
          const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${datav[0].lat}&lon=${datav[0].lon}&units=metric&appid=e74a92d119ed5997e75aba26772a14e6`)
                if (!res.ok)
                throw new Error(`Country not found (${res.status})`);
                const data = await res.json()
                .catch((err) => console.log(`${err} 💥💥💥`))
                setcurrentMeteo(
                  {temperature:data.current.temp,
                    nuage: data.current.weather[0].main,
                    icon:  data.current.weather[0].icon
                  }) 
                  // console.log(currentMeteo)
                  let sevenDayMeteo =data.daily.map(daily=>daily.temp.day)
                  // console.log(sevenDayMeteo)
                  const dateObj = new Date();
                   const day = dateObj.getDay();
                  //  console.log(day)
                  const week = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
                  
             
                  const actualWeek=[]
                  let i = day +1
                  while(actualWeek.length < 8){
                   if(i === 7){
                         i = 0
                         actualWeek.push(week[i])
                       i++
                       }else{
                        actualWeek.push(week[i])
                         i++
                       }
                      }
                 console.log(actualWeek)
                 setDailyTemp(sevenDayMeteo.map((temp,i)=>({
                  jour:actualWeek[i],
                    temperature:temp
                    
                 })))
                 
                  } 
                  getMeteo()
                  
      }

    }
  ,[clicked])
  // console.log(currentMeteo)

  
 

            // React.useEffect(
            //   ()=>{
            //     setIsSubmitted(prevValue => !prevValue)
            //   }
            // ,[currentMeteo])
// let interVille =""
//   function handleChange(e){
//     setVille(e.target.value) 
//     // console.log(ville)
// }
         
function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}
  function handleSubmit(e){
    e.preventDefault() 
    // setIsSubmitted()
    // setApiResponse(res => !res)
    
    setVille(capitalize(document.getElementById("city-name").value));
    setClicked(value => value +1)
}

const dailyMeteoElements = dailyTemp.map(dayTemp=>
  <DailyMeteo day={dayTemp.jour} temp={dayTemp.temperature}/>
)
  return (
    <div className="App">
      <header className="App-header">
<h1>Application météo</h1>
      </header>
     
     <div className='current-meteo-container'>
     {clicked !==0 && <Meteo ville={ville} icon={currentMeteo.icon} nuage={currentMeteo.nuage} temperature={currentMeteo.temperature}/>}
     {clicked !==0 && <form id="coordinates-form" onSubmit={handleSubmit}>
      <div className='input-label'>
        <label htmlFor="city-name">Entrez le nom de la ville</label>
        <input id="city-name"  name="ville" type="text"  />
      </div>
      <button id="button">Voir la température</button>
    </form>}
     </div>

    <div className="daily-meteo-container">{isSubmitted && dailyMeteoElements}</div>
    </div>
  );
}

export default App;
