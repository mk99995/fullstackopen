import React from "react";

const Country = (props) => {
  let country = props.country[0];
  let languages = Object.values(country.languages);
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages </h3>
      <ul>
        {languages.map((item) => {
          return (
            <React.Fragment key={item}>
              <li> {item}</li>
            </React.Fragment>
          );
        })}
      </ul>
      <img src={country.flags.png}></img>
    </>
  );
};

export default Country;
