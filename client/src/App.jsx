import React from 'react';
import { Routes, Route,} from 'react-router-dom'

import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { UserProfile } from './components/UserProfile'
import { NotFound } from './components/NotFound'
import { Navigation } from './components/Navigation';

import './App.css';
import { AuthRoute, UserProvider } from './tools/hooks';

function App() {
  
  return (    
    <UserProvider >
      <Navigation />
      <Routes>
        <Route index element= {<AuthRoute><Home /></AuthRoute>} />
        <Route path="/user-:username" element= {<AuthRoute ><UserProfile /></AuthRoute>}/>
        <Route path="*" element= {<NotFound />}/>  
        <Route path="/login" element= {<Login />}/>
        <Route path="/signup" element= {<Signup />}/>
      </Routes>
    </UserProvider>
  );
}

export default App;
