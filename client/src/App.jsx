import React from 'react';
import { Routes, Route,} from 'react-router-dom'

import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { UserProfile } from './components/UserProfile'
import { NotFound } from './components/NotFound'

import './App.css';
import { useState } from 'react';
import { AuthRoute, AppContext } from './tools/hooks';

function App() {
  const [user, setUser] = useState(AppContext)
 
  
  return (
    
    <AppContext.Provider value= {{ user, setUser }} >
      <Routes>
        <Route index element= {<AuthRoute><Home /></AuthRoute>}/>
        <Route path="/user-:username" element= {<AuthRoute ><UserProfile /></AuthRoute>}/>
        <Route path="*" element= {<NotFound />}/>  
        <Route path="/login" element= {<Login />}/>
        <Route path="/signup" element= {<Signup />}/>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
