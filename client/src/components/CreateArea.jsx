import React, { useState } from "react";

function CreateArea(props) {
  const [character, setCharacter] = useState({
    name: "",
    description: "",
    imageUrl: "",
    website: ""
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
      description: "",
      imageUrl: "",
      website: ""
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
          placeholder="name"
        />
        <textarea style={cstyleInput}
          name="description"
          onChange={handleChange}
          value={character.description}
          placeholder="your description here..."
          rows="3"
        />
        <input style={cstyleInput}
          name="website"
          onChange={handleChange}
          value={character.website}
          placeholder="paste your website link here"
        />

        <input style={cstyleInput}
          name="imageUrl"
          onChange={handleChange}
          value={character.imageUrl}
          placeholder="paste your image url here"
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
  right: '10px',
  bottom: '10px',
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
