import React, { useState } from "react";

function Greeting() {
  const [changedText, setChangedText] = useState(false);

  const changedTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h1>Hello World!</h1>
      {!changedText && <p>It's good to see you!</p>}
      {changedText && <p>Changed</p>}
      <button onClick={changedTextHandler}>Changed</button>
    </div>
  );
}

export default Greeting;
