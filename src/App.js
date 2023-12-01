// App.js

import React, { useState } from 'react';
import './components/Login.css';
import Login from './components/Login';
import BurgerMenu from './components/BurgerMenu';
import AuthModule from './components/AuthModule';
import { authenticateUser } from './userManagement';
import { ActivityProvider } from './ActivityContext'; // Ruta relativa a App.js
import SecurityIncidentsModule from './components/SecurityIncidentsModule'; // Ruta relativa a App.js
import DataStorageModule from './components/DataStorageModule'; // Ajusta la ruta según la ubicación real

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username, password) => {
    const isValid = authenticateUser(username, password);

    if (isValid) {
      setIsLoggedIn(true);
      setCurrentUser(username);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedModule('');
    setCurrentUser(null);
  };

  const handleModuleSelect = (moduleName) => {
    setSelectedModule(moduleName);
  };

  return (
    <ActivityProvider>
      <div className="App">
        {!isLoggedIn ? (
          <Login
            onLogin={handleLogin}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        ) : (
          <>
            <BurgerMenu
              onSelectModule={handleModuleSelect}
              onLogout={handleLogout}
            />
            {selectedModule === 'AuthModule' && <AuthModule currentUser={currentUser} />}
            {selectedModule === 'DataStorageModule' && <DataStorageModule currentUser={currentUser} />}
            {selectedModule === 'SecurityIncidentsModule' && <SecurityIncidentsModule currentUser={currentUser} />}
          </>
        )}
      </div>
    </ActivityProvider>
  );
}

export default App;
