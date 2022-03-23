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
      <form>
        <input
          name="name"
          onChange={handleChange}
          value={character.name}
          placeholder="Character Name"
        />
        <input
          name="age"
          onChange={handleChange}
          value={character.age}
          placeholder="Character Age"
        />
        <textarea
          name="description"
          onChange={handleChange}
          value={character.description}
          placeholder="Short description of your character..."
          rows="3"
        />
        <textarea
          name="imageUrl"
          onChange={handleChange}
          value={character.imageUrl}
          placeholder="Paste image Url of your character here."
          rows="2"
        />
        <button onClick={submitCharacter}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
