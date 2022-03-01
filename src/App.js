import React from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  
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

  const diceElements = dice.map(obj => {
    const clickFunc = tenzies ? () => {} : () => hold(obj.id);
    return (
      <Die 
        key={obj.id}
        face={obj.value}
        isHeld={tenzies ? true : obj.isHeld}
        hold={clickFunc}
      />
    );
  });

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

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  React.useEffect(() => {
    if (dice.every(
      die => die.value === dice[0].value
    )) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <main className="container">
      {tenzies && <Confetti />}
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
        onClick={tenzies ? newGame : roll}
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
};