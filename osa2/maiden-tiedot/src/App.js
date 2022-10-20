import { React, useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");

  const hook = () => {
    console.log("hook");
    axios.get("http://localhost:3001/countries").then((responce) => {
      console.log("promise fulfilled");
      setCountries(responce.data);
    });
  };

  useEffect(hook, []);

  return (
    <div className="App">
      <Filter input={input} setInput={setInput} countries={countries} />
      <Countries countries={countries} input={input} setInput={setInput} />
    </div>
  );
};

export default App;
