import React, { useState } from "react";
import { useTransition, animated } from 'react-spring'

function DisplayPic() {
  const [active, setActive] = useState(true);
  const transition = useTransition(active, {
    from: { x: -100 },
    enter: {x: 0 },
    leave: { x: 100}
  });

  return (
    <div>
      {active ? <img
        style={cstyle1}
        className="display-image"
        src="/res/mydp.jpg"
        alt="mydp">
        </img>  : ''}
        {transition((style, item) =>
          item ? <animated.div style={style} className="display-image" /> : ''
        )}
    </div>
  );
}

const cstyle1 = {
    position: 'absolute',
    width: '40px',
    borderRadius: '100%',
    margin: '15px 10px 15px',
    transform: 'scale(110%)',
    boxShadow: '2px 2px 4px black'
}

export default DisplayPic;
