import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { getAllPizzas, updatePizza, deletePizza } from '../utils/api';

const ChefDashboard = () => {
  const [pizzaList, setPizzaList] = useState([]);
  const [updatedPizzaName, setUpdatedPizzaName] = useState('');

  useEffect(() => {
    const getPizzaList = async () => {
      try {
        const res = await getAllPizzas(localStorage.getItem('user_id'));
        if (!res.ok) {
          throw new Error('No list of toppings!');
        }
        const pizzaList = await res.json();
        setPizzaList(pizzaList);
      } catch (err) {
        console.error(err);
      }
    };
    getPizzaList();
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'updatedPizzaName') {
      setUpdatedPizzaName(inputValue);
    }
  };

  const handlePizzaUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      pizzaName: updatedPizzaName,
      chef_id: localStorage.getItem('user_id'),
      pizzaId: e.target.value,
    };

    try {
      const res = await updatePizza(formData);
      if (!res.ok) {
        alert('Error updating topping.');
        return;
      }
    } catch (err) {
      console.error(err);
    }

    setUpdatedPizzaName('');
    alert('Pizza Name updated Successfully!');
    window.location.reload();
  };

  const handlePizzaDelete = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    try {
      const res = await deletePizza(e.target.value);
      if (!res.ok) {
        alert('ERROR: Pizza not deleted');
        return;
      }
    } catch (err) {
      console.error(err);
    }
    alert('Pizza Deleted Successfully!');
    window.location.reload();
  };

  return (
    <Container className="align-items-center">
      {pizzaList.map((pizza) => {
        return (
          <Card.Body key={pizza._id}>
            <Card.Title>{pizza.pizzaName}</Card.Title>
            <Card.Body>{pizza.toppings}</Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formUpdatePizza">
                <Form.Label>Enter new name for Pizza</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new pizza name"
                  name="updatedPizzaName"
                  value={updatedPizzaName.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="warning"
                value={pizza._id}
                onClick={handlePizzaUpdate}
                className="m-2"
              >
                Update Pizza Name!
              </Button>
            </Form>
            <Button
              variant="danger"
              value={pizza._id}
              onClick={handlePizzaDelete}
              className="m-2"
            >
              Delete Pizza!
            </Button>
          </Card.Body>
        );
      })}
    </Container>
  );
};
export default ChefDashboard;
