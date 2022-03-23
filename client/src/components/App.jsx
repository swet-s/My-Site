import axios from "axios"
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Character from "./Character";
import CreateArea from "./CreateArea";

function App() {
  const [characters, setCharacters] = useState([]);

  const addCharacter = (newCharacter) => {
    axios.post("http://localhost:3001/create", newCharacter).then(res => {
      getCharacter();
      console.log("Successfully Added");
    });
  };

  const getCharacter = () => {
    axios.get("http://localhost:3001/").then(res => {
      // console.log(characters);
      setCharacters(res.data);
    });
  };

  // const updateEmployeeWage = (id) => {
  //   Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
  //     (response) => {
  //       setEmployeeList(
  //         employeeList.map((val) => {
  //           return val.id === id
  //             ? {
  //                 id: val.id,
  //                 name: val.name,
  //                 country: val.country,
  //                 age: val.age,
  //                 position: val.position,
  //                 wage: newWage,
  //               }
  //             : val;
  //         })
  //       );
  //     }
  //   );
  // };
  //


  const deleteCharacter = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then( res => {
      getCharacter();
      // setCharacters(characters.filter((characterItem, index) => {
      // return characterItem._id !== id;
      // }));
    });
  };

  return (
    <div>
      <Header />
      {getCharacter()}
      <CreateArea onAdd = {addCharacter} />

      {characters.map((characterItem, index) => {
          return (
            <Character
            key = {index}
            id = {characterItem._id}
            name = {characterItem.name}
            description = {characterItem.description}
            age = {characterItem.age}
            imageUrl = {characterItem.imageUrl}
            onDelete = {deleteCharacter}
            />
          );
        })}
      <Footer />
    </div>
);
}

export default App;
