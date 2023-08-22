import React from "react"
import "./App.css"
const dotCoordinates=[
    [],
    [{x:50,y:50}],
    [
        {x:30,y:30},   
        {x:70,y:70},
    ],
    [
        {x:30,y:30},
        {x:50,y:50},   
        {x:70,y:70},
    ],
     [
        {x:30,y:30},
        {x:70,y:30},   
        {x:30,y:70},
        {x:70,y:70},
    ],
     [
        {x:30,y:30},
        {x:70,y:30},  
        {x:30,y:70},
        {x:70,y:70},
        {x:50,y:50},
      
    ],
     [
        {x:30,y:30},
        {x:70,y:30},   
        {x:30,y:70},
        {x:70,y:70},
        {x:30,y:50},
        {x:70,y:50},
       
    ],
]
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    function renderDots(){
        return dotCoordinates[props.value].map((dot,index)=>(
            <circle key={index} cx={dot.x} cy={dot.y} r={5} fill="balck"/>
        ))
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
           <svg width="100%" height="100%" viewBox="0 0 100 100">
           {renderDots()}
           </svg>
        </div>
    )
}