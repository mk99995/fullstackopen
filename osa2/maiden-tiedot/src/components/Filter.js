import React from "react";

const Filter = (props) => {
  return (
    <>
      <input
        value={props.input}
        onChange={(e) => {
          props.setInput(e.target.value);
        }}
      />
    </>
  );
};

export default Filter;
