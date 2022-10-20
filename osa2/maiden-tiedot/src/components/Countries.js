import React from "react";
import Country from "./Country";

const Countries = (props) => {
  let amount = props.countries.filter((item) =>
    item.name.common.toLowerCase().includes(props.input.toLowerCase())
  ).length;
  const showCountry = () => {};

  if (amount > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (amount === 1) {
    return (
      <Country
        country={props.countries.filter((item) =>
          item.name.common.toLowerCase().includes(props.input.toLowerCase())
        )}
      />
    );
  } else {
    return (
      <>
        {props.countries
          .filter((item) =>
            item.name.common.toLowerCase().includes(props.input.toLowerCase())
          )
          .map((item) => {
            return (
              <React.Fragment key={item.name.common}>
                <p>
                  {item.name.common}
                  <button
                    onClick={() => {
                      props.setInput(item.name.common);
                    }}
                  >
                    show
                  </button>
                </p>
              </React.Fragment>
            );
          })}
      </>
    );
  }
};

export default Countries;
