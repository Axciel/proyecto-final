import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './DataStorageModule.css';
import eventLogger from './eventLogger'; // Suponiendo que eventLogger es la función que registra actividades

const DataStorageModule = ({ currentUser }) => {
  const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
  const [data, setData] = useState(storedData);
  const [filteredData, setFilteredData] = useState([...data]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', description: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  const logActivity = (user, action, module) => {
    const timestamp = new Date().toISOString();
    const log = {
      id: Date.now(), // Generar un ID único para cada entrada
      timestamp,
      user,
      action,
      event: `${user} ${action} in ${module}`, // Evento compuesto para mostrar en el registro
    };
    eventLogger.logActivity(log); // Aquí se registra la actividad utilizando eventLogger
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (query) => {
    const filtered = data.filter(item => {
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.date.includes(query)
      );
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleAdd = () => {
    const now = moment().tz('America/Monterrey').format('YYYY-MM-DD HH:mm:ss');
    const newData = { ...formData, id: Date.now(), date: now };
    const updatedData = [...data, newData];


    logActivity(currentUser, 'Agregó dato en Data Storage', 'DataStorageModule');

    setData(updatedData);
    localStorage.setItem('storedData', JSON.stringify(updatedData));
    
    // Actualiza también el estado de filteredData para reflejar los cambios
    setFilteredData(updatedData);
    
    setFormData({ id: '', name: '', description: '', date: '' });
    setSearchQuery('');
  };
  

  const handleUpdate = () => {
    const updatedData = data.map(item =>
      item.id === formData.id ? formData : item
    );

    logActivity(currentUser, 'Actualizó dato en Data Storage', 'DataStorageModule');

    
    setData(updatedData);
    localStorage.setItem('storedData', JSON.stringify(updatedData));
    
    // Actualiza también el estado de filteredData para reflejar los cambios
    setFilteredData(updatedData);
    
    setFormData({ id: '', name: '', description: '', date: '' });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);

    if (itemToEdit) {
      // Establece los valores del elemento a editar en el formulario
      setFormData({
        id: itemToEdit.id,
        name: itemToEdit.name,
        description: itemToEdit.description,
        date: itemToEdit.date,
      });

      setIsEditing(true);
    }
  };
  

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    
    logActivity(currentUser, 'Eliminó dato en Data Storage', 'DataStorageModule');


    setData(updatedData);
    localStorage.setItem('storedData', JSON.stringify(updatedData));
    
    // Actualiza también el estado de filteredData para reflejar los cambios
    setFilteredData(updatedData);
  };
  

  return (
    <div className="data-storage-module">
      <h2>Registros</h2>
      <div className="add-form">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Descripción"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <button onClick={isEditing ? handleUpdate : handleAdd}>
          {isEditing ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="records-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item.id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataStorageModule;
