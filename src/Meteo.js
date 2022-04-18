import React from "react";

export default function Meteo(props){
  let nuage=""
  if(props.nuage ==="Clear"){
    nuage = "Le ciel est clair"
  }else if(props.nuage ==="Rain" ){
    nuage = "Il pleut"
  }else if(props.nuage ==="Snow" ){
    nuage = "Il neige"
  }
  return(
    <div><h2>La temperature est de {props.temperature}°C</h2>
    <p>{nuage}</p></div>
  )
}