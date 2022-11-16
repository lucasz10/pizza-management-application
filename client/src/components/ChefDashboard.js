import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
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
    <div>
      {pizzaList.map((pizza) => {
        return (
          <Card.Body key={pizza._id} className="col-3">
            <Card.Title>{pizza.pizzaName}</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formUpdatePizza">
                <Form.Label>Enter new name for Pizza</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new topping name"
                  name="updatedPizzaName"
                  value={updatedPizzaName.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="warning" value={pizza._id}>
                Update Pizza Name!
              </Button>
            </Form>
            <Button
              variant="danger"
              value={pizza._id}
              onClick={handlePizzaDelete}
            >
              Delete Pizza!
            </Button>
          </Card.Body>
        );
      })}
    </div>
  );
};
export default ChefDashboard;
