import axios from "axios"
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Character from "./Character";
import CreateArea from "./CreateArea";

function App() {
  const [characters, setCharacters] = useState([]);

  const url = "https://agile-temple-60244.herokuapp.com/";
  
  const addCharacter = (newCharacter) => {
    axios.post(url+"create", newCharacter).then(res => {
      getCharacter();
      console.log("Successfully Added");
    });
  };

  const getCharacter = () => {
    axios.get(url).then(res => {
      setCharacters(res.data);
    });
  };

  const deleteCharacter = (id) => {
    axios.delete(url+`delete/${id}`).then( res => {
      getCharacter();
      // setCharacters(characters.filter((characterItem, index) => {
      // return characterItem._id !== id;
      // }));
    });
  };

  getCharacter();
  return (
    <div>
      <Header />
      <CreateArea onAdd = {addCharacter} />

      <div className="background">
        {characters.map((characterItem, index) => {
            return (
              <Character
              key = {index}
              index = {index}
              id = {characterItem._id}
              name = {characterItem.name}
              description = {characterItem.description}
              imageUrl = {characterItem.imageUrl}
              website = {characterItem.website}
              onDelete = {deleteCharacter}
              />
            );
          })}
      </div>

      <Footer />
    </div>
);
}

export default App;
