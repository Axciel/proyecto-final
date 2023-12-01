export const authenticateUser = (username, password) => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(u => u.username === username && u.password === password);
  return user ? true : false;
};

export const addUser = (newUser) => {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  storedUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(storedUsers));
};
