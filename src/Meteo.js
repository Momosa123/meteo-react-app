import React from "react";

export default function Meteo(props){
  let nuage=""
  if(props.nuage ==="Clear"){
    nuage = "Le ciel est clair"
  }else if(props.nuage ==="Rain"){
    nuage = "Il pleut"
  }else if(props.nuage ==="Snow"){
    nuage = "Il neige"
  }else if(props.nuage ==="Clouds"){
    nuage = "Le ciel est nuageux"
  }
  return(
    <div className="meteo-container">
    <img className="meteo-image" src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" />
    <div className="sentence-container">  <h2>La temperature est de {props.temperature}° à {props.ville}</h2>
    <p>{nuage}</p></div>
    
    </div>
  )
}