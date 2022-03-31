import React from "react";
import InsertLinkIcon from '@mui/icons-material/InsertLink';

function Character(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div style={cstyleCharacter} className="character">

      <a style={cstyleA} href={props.website} target="_blank"><InsertLinkIcon /></a>

      <button style={cstyleButton} onClick={handleClick}>×</button>
      <h1 style={cstyleH1}>{props.name}</h1>
      <img
        style={props.index%2 ? cstyleImgL : cstyleImgR}
        src={props.imageUrl}
        onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src="https://www.tibs.org.tw/images/default.jpg";
      }}
      />
      <p style={cstyleP}>{props.description}</p>
    </div>
  );
}

const cstyleCharacter = {
  minHeight: '200px',
  width: '70%',
  padding: '10% auto',
  margin: '10px auto',
  textAlign: 'left',
  background: '#fff',
  borderRadius: '7px',
  boxShadow: '0 2px 3px #aaa',
  float: 'left',
};

const cstyleH1 = {
    fontSize: '1.8em',
    marginBottom: '6px',
}

const cstyleP = {
  // display: "block",
  fontSize: '1.1em',
  margin: '16px',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
}

const cstyleImgL = {
    width: '20%',
    borderRadius: '100%',
    float: 'left',
    margin: '10px 20px 10px 10px',
}

const cstyleImgR = {
    width: '20%',
    borderRadius: '100%',
    float: 'right',
    margin: '10px 20px 10px 10px',
}

const cstyleA = {
  position: 'relative',
  left: '2px',
  top: '2px',
  float: 'left',
  color: '#eee',
  background: '#9e2',
  fontSize: '1.5em',
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  fontFamily: '"Merriweather", serif',
  textDecoration: 'none',
  border: 'none',
  borderRadius: '25%',
  width: '30px',
  height: '25px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
  outline: 'none',
}

const cstyleButton = {
  position: 'relative',
  right: '2px',
  top: '2px',
  float: 'right',
  color: '#eee',
  background: '#900',
  fontSize: '1.2em',
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
  border: 'none',
  borderRadius: '50%',
  width: '25px',
  height: '25px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
  outline: 'none',
}

export default Character;
