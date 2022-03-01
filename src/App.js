import React from 'react';
import {nanoid} from 'nanoid';
import Die from './components/Die';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  
  function allNewDice() {
    let array = new Array();
    for (let i = 0; i < 10; i++) {
      array.push({
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: true
      });
    }
    return array;
  }

  const diceElements = dice.map(
    obj => <Die key={obj.id} face={obj.value} isHeld={obj.isHeld} />
  );

  function handleRollClick() {
    setDice(prevDice => prevDice.map(die => {
      return(
        die.isHeld ? die : {
          id: die.id,
          value: Math.floor(Math.random() * 6) + 1,
          isHeld: false
        }
      );
    }));
  }

  return (
    <main className="container">
      <h1 className="title-text">Tenzies</h1>
      <p className="instruction-text">
        Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="die-container">
        {diceElements}
      </div>
      <button 
        className="roll-btn"
        onClick={handleRollClick}
      >
        Roll
      </button>
    </main>
  );
};