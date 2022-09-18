import React from 'react';
import { Routes, Route,} from 'react-router-dom'

import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { UserProfile } from './components/UserProfile'
import { NotFound } from './components/NotFound'

import './App.css';
import { useState } from 'react';
import { AuthRoute } from './tools/hooks';

function App() {
  const [user, setUser] = useState("")
  
  return (
    <>
    <Routes>
      <Route index element= {<AuthRoute setUser={setUser} user={user}><Home setUser={setUser} user= {user}/></AuthRoute>}/>
      <Route path="/user-:username" element= {<AuthRoute setUser={setUser} user={user}><UserProfile user={user}/></AuthRoute>}/>
      <Route path="*" element= {<NotFound />}/>  
      <Route path="/login" element= {<Login setUser= {setUser}/>}/>
      <Route path="/signup" element= {<Signup />}/>
    </Routes>
    </>
  );
}

export default App;
