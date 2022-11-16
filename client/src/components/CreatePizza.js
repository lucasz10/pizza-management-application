import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllToppings, createPizza } from '../utils/api';

const CreatePizza = () => {
  const [toppingList, setToppingList] = useState([]);
  const [newPizzaToppings, setNewTopping] = useState([]);
  const [newPizzaName, setNewPizzaName] = useState('');

  useEffect(() => {
    const getToppingList = async () => {
      try {
        const res = await getAllToppings(localStorage.getItem('owner_id'));
        if (!res.ok) {
          throw new Error('No list of toppings!');
        }
        const toppingList = await res.json();
        setToppingList(toppingList);
      } catch (err) {
        console.error(err);
      }
    };
    getToppingList();
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'newPizzaName') {
      setNewPizzaName(inputValue);
    }
  };

  const addTopping = (e) => {
    e.preventDefault();

    for (let i = 0; i < newPizzaToppings.length; i++) {
      if (newPizzaToppings[i] === e.target.value) {
        return;
      }
    }

    setNewTopping((newPizzaToppings) => [...newPizzaToppings, e.target.value]);
  };

  const removeTopping = (e) => {
    e.preventDefault();
    const name = e.target.value;

    setNewTopping(newPizzaToppings.filter((topping) => topping !== name));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newPizzaToppings.length < 1) {
      alert('Please Add toppings!');
      return;
    }
    if (newPizzaName.trim(' ') === '') {
      alert('Please Add a name!');
      return;
    }

    const formData = {
      pizzaName: newPizzaName,
      toppings: newPizzaToppings,
      chef_id: localStorage.getItem('user_id'),
    };
    console.log(formData);

    try {
      const res = await createPizza(formData);
      if (!res.ok) {
        alert('Pizza exists! Please make a new Pizza');
        return;
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setNewTopping([]);
    alert('Pizza Created Successfully!');
    window.location.reload();
  };

  return (
    <div>
      <h2>Create a pizza Here!</h2>
      <Form>
        <Form.Group>
          <Form.Label> Click on the wanted toppings:</Form.Label>
          {toppingList.map((topping) => {
            return (
              <Button
                variant="primary"
                value={topping.toppingName}
                onClick={addTopping}
                className="mx-2"
              >
                {topping.toppingName}
              </Button>
            );
          })}
          <h3>Added Toppings. Click to Remove</h3>
          {newPizzaToppings.map((topping) => {
            return (
              <Button
                variant="primary"
                value={topping}
                onClick={removeTopping}
                className="mx-2"
              >
                {topping}
              </Button>
            );
          })}
          <h3>Enter new name for topping</h3>
          <Form.Control
            type="newPizzaName"
            placeholder="Enter new pizza name"
            name="newPizzaName"
            value={newPizzaName.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleFormSubmit}>
          Create Pizza!
        </Button>
      </Form>
    </div>
  );
};

export default CreatePizza;
