import React from "react";

const Phonebook = (props) => {
  return (
    <>
      <h2>Phonebook</h2>
      <p>filter shown with</p>
      <input
        value={props.newFilter}
        onChange={(e) => props.setNewFilter(e.target.value)}
      />
    </>
  );
};

export default Phonebook;
