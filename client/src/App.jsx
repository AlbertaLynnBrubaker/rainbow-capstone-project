import React from 'react';
import { Routes, Route,} from 'react-router-dom'
import { AuthRoute, PageProvider, UserContext, UserProvider } from './tools/hooks';
import { useEffect } from 'react';
import { useState } from 'react';


import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { UserProfile } from './components/UserProfile'
import { UserReset } from './components/UserReset';
import { UserDelete } from './components/UserDelete';
import { UserWall } from './components/UserWall'
import { NotFound } from './components/NotFound'
import { Navigation } from './components/Navigation';
import { GroupWall } from './components/GroupWall'
import { GroupList } from './components/GroupList'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalStyle from './GlobalStyles.style';
import { Background } from './styles/Background.style';
import { useContext } from 'react';


function App() {
  // const { user, setUser } = useContext(UserContext)
  const [ backgroundUrl, setBackgroundUrl ] = useState('')
  const [ logoUrl, setLogoUrl ] = useState('')

  useEffect(() => {
    fetch('/background')
      .then(r => r.json())
      .then((data) => {
        setBackgroundUrl(data.background_url)
        setLogoUrl(data.logo_url)
      })
  },[])

  return (
    <>
    <GlobalStyle />
    <UserProvider >
      <PageProvider>        
        <Background url={backgroundUrl}>      
          <Navigation logoUrl={logoUrl} />
          <Routes>
            <Route index element= {<AuthRoute><Home /></AuthRoute>} />
            <Route path="/:username/profile" element= {<AuthRoute ><UserProfile /></AuthRoute>}/>
            <Route path="/:username/password" element= {<AuthRoute><UserReset /></AuthRoute>}/>
            <Route path="/:username/delete" element= {<AuthRoute><UserDelete /></AuthRoute>}/>
            <Route path="/:username" element= {<AuthRoute ><UserWall /></AuthRoute>}/>
            <Route path="/groups/:title" element= {<AuthRoute ><GroupWall /></AuthRoute>}/>
            <Route path="/groups" element= {<AuthRoute ><GroupList /></AuthRoute>}/>
            <Route path="*" element= {<NotFound />}/>  
            <Route path="/login" element= {<Login />}/>
            <Route path="/signup" element= {<Signup />}/>
          </Routes>
        </Background>        
      </PageProvider>
    </UserProvider>
    </>
  );
}

export default App;
