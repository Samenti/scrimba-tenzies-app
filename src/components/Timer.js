import React from 'react';

export default function Timer(props) {
  let timerText = '';
  if (props.mins < 1) {
    timerText = `${props.secs} sec`;
  } else if (props.mins < 10) {
    timerText = (
      `${props.mins}:${props.secs < 10 ? '0' : ''}${props.secs}`
    );
  } else {
    timerText = '∞';
  }
  return (
    <span className="timer">
      {`Time elapsed: ${timerText}`}
    </span>
  );
};