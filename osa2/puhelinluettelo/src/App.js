import React from "react";
import { useState } from "react";
import Phonebook from "./components/Phonebook";
import PersonsForm from "./components/PersonForm";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();

    if (persons.map((item) => item.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      console.log("why");
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
    }
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  console.log(newFilter);

  return (
    <div>
      <Phonebook newFilter={newFilter} setNewFilter={setNewFilter} />
      <PersonsForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />
      <Numbers persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
