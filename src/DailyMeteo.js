import React from "react";

export default function DailyMeteo(props){

  return(
    <div >
    <div><p>{props.day}</p></div>
    <div><p>{props.temp}°</p></div>
    </div>
  )
}