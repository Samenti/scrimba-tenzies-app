import React from 'react';

export default function Die(props) {
  return (
    <div 
      className={props.isHeld ? "die held-die noselect" : "die noselect"}
      onClick={props.hold}
    >
      {props.face}
    </div>
  );
};