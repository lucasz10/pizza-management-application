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

export const logout = () => {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Topping API requests
export const getAllToppings = () => {
  return fetch('/api/topping', {
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
  return fetch('/api/topping', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toppingData),
  });
};

export const deleteTopping = (toppingId) => {
  return fetch('/api/topping', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toppingId),
  });
};

// Pizza API Requests
export const getAllPizzas = () => {
  return fetch('/api/pizza', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createPizza = (pizzaData) => {
  return fetch('/api/pizza', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaData),
  });
};

export const updatePizza = (pizzaData) => {
  return fetch('/api/pizza', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaData),
  });
};

export const deletePizza = (pizzaId) => {
  return fetch('/api/pizza', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaId),
  });
};
