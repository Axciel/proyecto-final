import React, { useState, useEffect } from 'react';
import { addUser } from '../userManagement';
import './AuthModule.css';
import eventLogger from './eventLogger';

const AuthModule = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  // Cargar usuarios guardados al iniciar
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [editedUser, setEditedUser] = useState({ id: null, username: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddUser = () => {
    const newId = users.length + 1;
    const updatedUsers = [...users, { id: newId, ...newUser }];
    setUsers(updatedUsers);
    addUser({ id: newId, ...newUser });

 // Registro de actividad
 eventLogger.logActivity(currentUser, 'Agregó usuario', `Nuevo usuario: ${newUser.username}`);

    // Guardar usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setNewUser({ username: '', password: '' });
    alert('Usuario agregado correctamente');
  };
  const handleEditUser = (user) => {
    setEditedUser(user);
    setIsEditing(true);
  
    eventLogger.logActivity(currentUser, 'Editó usuario', `Usuario editado: ${user.username}`);
  };
  
  const handleUpdateUser = () => {
    const updatedUsers = users.map(u =>
      u.id === editedUser.id ? { ...editedUser } : u
    );
  
    // Actualizar el estado 'users' y guardar en el almacenamiento local
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Agregar esta línea
  
    setIsEditing(false);
    alert('Usuario actualizado correctamente');
  
    eventLogger.logActivity(currentUser, 'Editó usuario', `Usuario editado: ${editedUser.username}`);
  };
  
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Actualizar el almacenamiento local
    alert('Usuario eliminado correctamente');
  
    eventLogger.logActivity(currentUser, 'Eliminó usuario', `ID de usuario eliminado: ${id}`);
  };
  
  
  return (
    <div className="auth-module">
      <h2>Agregar/Actualizar Usuario</h2>
      <input
        type="text"
        placeholder="Username"
        value={isEditing ? editedUser.username : newUser.username}
        onChange={(e) =>
          isEditing
            ? setEditedUser({ ...editedUser, username: e.target.value })
            : setNewUser({ ...newUser, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={isEditing ? editedUser.password : newUser.password}
        onChange={(e) =>
          isEditing
            ? setEditedUser({ ...editedUser, password: e.target.value })
            : setNewUser({ ...newUser, password: e.target.value })
        }
      />
      {isEditing ? (
        <button onClick={handleUpdateUser}>Actualizar Usuario</button>
      ) : (
        <button onClick={handleAddUser}>Agregar Usuario</button>
      )}

      <h2>Usuarios Asignados</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthModule;
