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
        isHeld: false
      });
    }
    return array;
  }

  function hold(id) {
    setDice(prevDice => prevDice.map(die => {
      return (
        die.id === id ? {...die, isHeld: !die.isHeld} : die
      );
    }));
  }

  const diceElements = dice.map(obj => 
    <Die 
      key={obj.id}
      face={obj.value}
      isHeld={obj.isHeld}
      hold={() => hold(obj.id)}
    />
  );

  function roll() {
    setDice(prevDice => prevDice.map(die => {
      return (
        die.isHeld ? die : {
          ...die,
          value: Math.floor(Math.random() * 6) + 1
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
        className="roll-btn noselect"
        onClick={roll}
      >
        Roll
      </button>
    </main>
  );
};