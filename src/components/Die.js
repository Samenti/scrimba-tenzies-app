import React from 'react';
import {nanoid} from 'nanoid';

export default function Die(props) {
  let dots = [];
  for (let i = 0; i < props.face; i++) {
    dots.push(<div key={nanoid()} className="dot"></div>);
  }
  const faceClass = `face-${props.face}`;
  return (
    <div 
      className={
        props.isHeld 
        ? 
        `die ${faceClass} held-die noselect` 
        : 
        `die ${faceClass} noselect`
      }
      onClick={props.hold}
    >
      {dots}
    </div>
  );
};