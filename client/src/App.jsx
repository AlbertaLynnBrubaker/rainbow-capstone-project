import React from 'react';
import { Routes, Route,} from 'react-router-dom'

import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { UserProfile } from './components/UserProfile'
import { UserWall } from './components/UserWall'
import { NotFound } from './components/NotFound'
import { Navigation } from './components/Navigation';

import './App.css';
import { GlobalStyles } from './GlobalStyles.style';
import { Background } from './styles/Background.style';

import { AuthRoute, PageProvider, UserProvider } from './tools/hooks';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [backgroundUrl, setBackgroundUrl] = useState('')

  useEffect(() => {
    fetch('/background?page=0')
      .then(r => r.json())
      .then((data) => setBackgroundUrl(data.background_url))
  },[])

  console.log(backgroundUrl)
  
  return (    
    <UserProvider >
      <PageProvider>
        <Background url={backgroundUrl}>
          <GlobalStyles/>
          <Navigation />
            <Routes>
              <Route index element= {<AuthRoute><Home /></AuthRoute>} />
              <Route path="/:username/profile" element= {<AuthRoute ><UserProfile /></AuthRoute>}/>
              <Route path="/:username" element= {<AuthRoute ><UserWall /></AuthRoute>}/>
              <Route path="*" element= {<NotFound />}/>  
              <Route path="/login" element= {<Login />}/>
              <Route path="/signup" element= {<Signup />}/>
            </Routes>
          </Background>
      </PageProvider>
    </UserProvider>
  );
}

export default App;
