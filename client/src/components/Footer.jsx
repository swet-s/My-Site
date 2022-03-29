import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div style={cstyle} className="footer">
      <p align="center">@copyright ⓒ {year}</p>
    </div>
  );
}

  const cstyle = {
    position: 'static',
    backgroundColor: '#222',
    borderRadius: '4px',
    color: 'white',
    paddingTop: '3px',
    paddingBottom: '3px',
    textTransform: 'uppercase',
    align: 'center',
  }

export default Footer;
