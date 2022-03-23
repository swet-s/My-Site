import React from "react";

function Character(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="character">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p>{props.age}</p>
      <img src={props.imageUrl}/>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Character;
