// User API Requests
export const createUser = (userData) => {
  return fetch('/api/user/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const login = (userData) => {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// Topping API requests
export const getAllToppings = (userId) => {
  return fetch(`/api/topping/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createTopping = (toppingData) => {
  return fetch('/api/topping', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toppingData),
  });
};

export const updateTopping = (toppingData) => {
  return fetch(`/api/topping/${toppingData.toppingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toppingData),
  });
};

export const deleteTopping = (toppingId) => {
  return fetch(`/api/topping/${toppingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Pizza API Requests
export const getAllPizzas = (chef_id) => {
  return fetch(`/api/pizza/${chef_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createPizza = (pizzaData) => {
  return fetch('/api/pizza/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaData),
  });
};

export const updatePizza = (pizzaData) => {
  return fetch(`/api/pizza/${pizzaData.pizzaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaData),
  });
};

export const deletePizza = (pizzaId) => {
  return fetch(`/api/pizza/${pizzaId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
