import React from "react";

const Numbers = (props) => {
  return (
    <>
      <h2>Numbers</h2>

      {props.persons
        .filter((item) =>
          item.name
            .toLocaleLowerCase()
            .includes(props.newFilter.toLocaleLowerCase())
        )
        .map((item) => (
          <p key={item.id}>
            {item.name} {item.number}
            <button onClick={() => props.deletePerson(item.id, item.name)}>
              delete
            </button>
          </p>
        ))}
    </>
  );
};

export default Numbers;
