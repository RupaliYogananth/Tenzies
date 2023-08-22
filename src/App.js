import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount,setRollCount]=React.useState(0)
    const [startTime,setStartTime]=React.useState(null)
    const [gameDuration,setGameDuration]=React.useState(0)

    const[bestDuration,setBestDuration]=React.useState(
      parseInt(localStorage.getItem("bestDuration"))||0
    )

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    React.useEffect(()=>{
      if(startTime&&tenzies){
        const endTime=Date.now();
        const duration=Math.floor((endTime-startTime)/1000)
        setGameDuration(duration)

        if(duration<bestDuration||bestDuration===0){
          setBestDuration(duration);
          localStorage.setItem("bestDuration",duration)
        }
      }
    },[startTime,tenzies,bestDuration])
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
/**
 * Challenge: Allow the user to play a new game when the
 * button is clicked and they've already won
 */
    
    function rollDice() {
        if(!tenzies) {
          if(!startTime){
            setStartTime(Date.now())
          }
            setRollCount(count=>count+1)

            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setStartTime(null)
            setRollCount(0)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
   
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <h4>Dice Rolled {rollCount} times</h4>
            {tenzies &&
           ( <div className="duration-container">
              <p className="duration-item">
                <img src="/timer.png" alt="timer" className="icon"/>Game Duration : {gameDuration} seconds </p>
              <p  className="duration-item">
              <img src="/trophy.png" alt="trophy" className="icon"/>Best Duration : {bestDuration} seconds </p>
              </div>)}
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}