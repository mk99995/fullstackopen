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
          <React.Fragment key={item.name}>
            <p>
              {item.name} {item.number}
            </p>
          </React.Fragment>
        ))}
    </>
  );
};

export default Numbers;
