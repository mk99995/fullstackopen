import { React, useEffect, useState } from "react";
import Phonebook from "./components/Phonebook";
import PersonsForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import service from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const hook = () => {
    service.getAll().then((personList) => {
      setPersons(personList);
    });
  };

  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();

    if (persons.map((item) => item.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      // setPersons(persons.concat(newPerson));
      service.create(newPerson).then((returned) => {
        setPersons(persons.concat(returned));
      });
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
