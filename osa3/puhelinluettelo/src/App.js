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

  const hookked = async () => {
    await service.getAll().then((personList) => {
      setPersons(personList);
      console.log("hooked");
    });
  };

  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();

    if (persons.map((item) => item.name).includes(newName)) {
      let numberReplase = `${newName} is already added to phonebook, replace the old number with a new one`;
      if (window.confirm(numberReplase)) {
        const newPerson = {
          name: newName,
          number: newNumber,
        };

        let personsId = persons.filter((item) => item.name === newName)[0].id;

        service.update(personsId, newPerson);

        service.getAll().then((personList) => {
          setPersons(personList);
          console.log("asd");
          return;
        });
      }
    } else {
      let id = 1;
      if (persons.length != 0) {
        id = persons.at(-1).id + 1;
      }
      const newPerson = {
        name: newName,
        number: newNumber,
        id,
      };
      // setPersons(persons.concat(newPerson));
      service.create(newPerson).then((returned) => {
        setPersons(persons.concat(returned));
      });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      service.remove(id);
      console.log("end1");
      service.getAll().then((personList) => {
        setPersons(personList);
      });
      console.log("end2");

      // console.log(service.getAll().then);
      // let a = service.getAll.then(all => )
    }
  };
  console.log(persons);
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
      <Numbers
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
