import React from 'react';
import {nanoid} from 'nanoid';
import {useStopwatch} from 'react-timer-hook';
import Confetti from 'react-confetti';
import Die from './components/Die';
import Timer from './components/Timer';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [score, setScore] = React.useState(0);
  const stopWatch = useStopwatch({autoStart: false});
  const [started, setStarted] = React.useState(false);
  const [tenzies, setTenzies] = React.useState(false);
  const [results, setResults] = React.useState(
    {rolls: 99999, time: 99999}
  );
  const [highScore, setHighScore] = React.useState(loadHighScore());
  
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

  function loadHighScore() {
    const storageValues = JSON.parse(
      window.localStorage.getItem("highscore")
    );
    if (storageValues) {
      return storageValues;
    } else {
      return results;
    }
  }

  function hold(id) {
    if (!started) {
      setStarted(true);
    }
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
    if (!started) {
      setStarted(true);
    }
    setScore(prevScore => prevScore + 1);
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
    setStarted(false);
    stopWatch.reset(null, false);
    setScore(0);
    setResults(
      {rolls: 99999, time: 99999}
    );
  }

  React.useEffect(() => {
    if (dice.every(
      die => die.value === dice[0].value
    )) {
      stopWatch.pause();
      const time = (
        stopWatch.days * 86400 + stopWatch.hours * 3600 
        + stopWatch.minutes * 60 + stopWatch.seconds
      );
      setResults({rolls: score, time: time});
      setTenzies(true);
      setStarted(false);
    }
    if (started && !stopWatch.isRunning) {
      stopWatch.start();
    }
  }, [dice]);

  React.useEffect(() => {
    setHighScore(prevHighScore => {
      const newHighScore = (
        prevHighScore.time >= results.time
        ?
        {rolls: results.rolls, time: results.time}
        :
        {rolls: prevHighScore.rolls, time: prevHighScore.time}
      );
      window.localStorage.setItem(
        'highscore', JSON.stringify(newHighScore)
      );
      document.title = (
        `*Tenzies* Best Time: \
        ${newHighScore.time === 99999 ? '∞' : newHighScore.time} \
        Rolls: ${newHighScore.rolls === 99999 ? '∞' : newHighScore.rolls}`
      );
      return newHighScore;
    });
  }, [tenzies]);

  return (
    <main className="container">
      {tenzies && 
        <Confetti 
          width={window.innerWidth - 2}
          height={window.innerHeight - 2}
        />
      }
      <h1 className="title-text">Tenzies</h1>
      {started || tenzies
        ? 
        <p className="instruction-text">
          {`Rolls: ${score}`}
          <Timer 
            secs={stopWatch.seconds}
            mins={stopWatch.minutes}
          />
        </p> 
        : 
        <p className="instruction-text">
          Roll until all dice are the same.
          Click each die to freeze it at its current value between rolls.
        </p>
      }
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