import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {
  getAllToppings,
  createTopping,
  updateTopping,
  deleteTopping,
} from '../utils/api';

const OwnerToppings = () => {
  const [toppingList, setToppingList] = useState([]);
  const [newTopping, setNewTopping] = useState('');
  const [updatedTopping, setUpdatedTopping] = useState('');

  useEffect(() => {
    const getToppingList = async () => {
      try {
        const res = await getAllToppings(localStorage.getItem('user_id'));
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

    if (inputType === 'newTopping') {
      setNewTopping(inputValue);
    } else {
      setUpdatedTopping(inputValue);
    }
  };

  // Handles button click for submitting a new Topping
  const handleNewToppingSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      toppingName: newTopping,
      owner_id: localStorage.getItem('user_id'),
    };

    try {
      const res = await createTopping(formData);
      if (!res.ok) {
        alert('Topping exists! Please make a new topping');
        return;
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setNewTopping('');
    alert('Topping Created Successfully!');
    window.location.reload();
  };

  // handles button click for Updating a Topping
  const handleToppingUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      toppingName: updatedTopping,
      owner_id: localStorage.getItem('user_id'),
      toppingId: e.target.value,
    };

    try {
      const res = await updateTopping(formData);
      if (!res.ok) {
        alert('Error updating topping.');
        return;
      }
    } catch (err) {
      console.error(err);
    }

    setUpdatedTopping('');
    alert('Topping updated Successfully!');
    window.location.reload();
  };

  // Handles button click to delete a topping
  const handleToppingDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await deleteTopping(e.target.value);
      if (!res.ok) {
        alert('ERROR: Topping not deleted');
        return;
      }
    } catch (err) {
      console.error(err);
    }
    alert('Topping Deleted Successfully!');
    window.location.reload();
  };

  return (
    <div>
      {toppingList.map((topping) => {
        return (
          <Card.Body key={topping._id}>
            <Card.Title>{topping.toppingName}</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formUpdateTopping">
                <Form.Label>Enter new name for topping</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new topping name"
                  name="updatedTopping"
                  value={updatedTopping.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="warning"
                value={topping._id}
                onClick={handleToppingUpdate}
              >
                Update Topping!
              </Button>
            </Form>
            <Button
              variant="danger"
              value={topping._id}
              onClick={handleToppingDelete}
            >
              Delete Topping!
            </Button>
          </Card.Body>
        );
      })}
      <Form>
        <Form.Group className="mb-3" controlId="formNewTopping">
          <Form.Label>Create a new Topping!</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new topping name"
            name="newTopping"
            value={newTopping.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleNewToppingSubmit}>
          Create Topping!
        </Button>
      </Form>
    </div>
  );
};

export default OwnerToppings;
