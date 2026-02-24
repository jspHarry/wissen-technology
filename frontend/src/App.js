import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App(){
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [view, setView] = useState('login'); // 'login' | 'register'
  if(!token){
    return (
      <div className="container">
        <div className="card">
          { view === 'login' ?
            <Login setToken={setToken} setView={setView}/> :
            <Register setView={setView} />
          }
        </div>
      </div>
    );
  }
  return <Dashboard token={token} setToken={setToken} />;
}

export default App;
