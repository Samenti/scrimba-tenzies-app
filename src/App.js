import React from 'react';
import Die from './components/Die';

export default function App() {
  const dice = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const diceElements = dice.map(
    (die, index) => <Die key={index} face={die}/>
  );
  return (
    <main className="container">
      <h1 className="title-text">Tenzies</h1>
      <p className="instruction-text">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="roll-btn">Roll</button>
    </main>
  );
};