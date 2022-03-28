import React, { useState } from "react";

function CreateArea(props) {
  const [character, setCharacter] = useState({
    name: "",
    age: "",
    description: "",
    imageUrl: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setCharacter(prevCharacter => {
      return {
        ...prevCharacter,
        [name]: value
      };
    });
  }

  function submitCharacter(event) {
    props.onAdd(character);
    setCharacter({
      name: "",
      age: "",
      description: "",
      imageUrl: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form style={cstyleForm}>
        <input style={cstyleInput}
          name="name"
          onChange={handleChange}
          value={character.name}
          placeholder="Character Name"
        />
        <input style={cstyleInput}
          name="age"
          onChange={handleChange}
          value={character.age}
          placeholder="Character Age"
        />
        <textarea style={cstyleInput}
          name="description"
          onChange={handleChange}
          value={character.description}
          placeholder="Short description of your character..."
          rows="3"
        />
        <textarea style={cstyleInput}
          name="imageUrl"
          onChange={handleChange}
          value={character.imageUrl}
          placeholder="Paste image Url of your character here."
          rows="2"
        />
        <button style={cstyleAdd} onClick={submitCharacter}>+</button>
      </form>
    </div>
  );
}

const cstyleForm = {
    position: 'relative',
    width: '50%',
    margin: '30px auto 20px auto',
    background: '#222',
    padding: '15px',
    borderRadius: '7px',
    boxShadow: '0 1px 5px rgb(138, 137, 137)',
};

const cstyleInput = {
  background: '#222',
  width: '100%',
  border: 'none',
  padding: '4px',
  outline: 'none',
  fontSize: '1.2em',
  fontFamily: 'inherit',
  color: '#fff',
  resize: 'none',
}

const cstyleAdd = {
  position: 'absolute',
  right: '18px',
  bottom: '-18px',
  background: '#eee',
  color: '#222',
  fontSize: '1.8em',
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  border: 'none',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
  outline: 'none',
}

export default CreateArea;
