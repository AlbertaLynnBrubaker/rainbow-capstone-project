import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiDoorOpenFill, RiDoorOpenLine } from 'react-icons/ri'
import LogoutButton from '../styles/Logout.style'

export const NavButton = ({path = "/", text = "Back"}) => {
  const { setPage } = useContext(PageContext)
  const nav = useNavigate()

  return (
    <button onClick={() => {
        nav(path)
        setPage(0)
      }}>
      {text}
    </button>
  )
}

export const UserContext = React.createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState("")
  return (
    <UserContext.Provider value= {{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export const UserGroupsContext = React.createContext()

export const UserGroupsProvider = ({children}) => {
  const [userGroups, setUserGroups] = useState([])
  
  return (
    <UserGroupsContext.Provider value= {{userGroups, setUserGroups}}>
      {children}
    </UserGroupsContext.Provider>
  )
}

export const UserFriendsContext = React.createContext()

export const UserFriendsProvider = ({children}) => {
  const [userFriends, setUserFriends] = useState([])
  
  return (
    <UserFriendsContext.Provider value= {{userFriends, setUserFriends}}>
      {children}
    </UserFriendsContext.Provider>
  )
}

export const PageContext = React.createContext()

export const PageProvider = ({children}) => {
  const [page, setPage] = useState(0)
  return (
    <PageContext.Provider value= {{page, setPage}}>
      {children}
    </PageContext.Provider>
  )
}

export const Logout = () => {
  const { user, setUser } = useContext(UserContext)
  const { setUserGroups } = useContext(UserGroupsContext)
  const { setUserFriends } = useContext(UserFriendsContext)
  const nav = useNavigate()  
  
  const handleLogout = () => {    
    fetch('/logout', {
      method: "DELETE"
    })
      .then(() => {
        setUser("")
        setUserGroups([])
        setUserFriends([])
        nav('/login')        
      })
  }

  return(
    <LogoutButton onClick={handleLogout}><RiDoorOpenFill className="btn-icon"/></LogoutButton>
  )
}

export const AuthRoute = ({children}) => {
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    fetch('/me')
      .then(r => {
        if(r.ok) {
          r.json().then(user => {
            setUser(user)
          })
        } else {
          r.json().then(errors => {
            console.error(errors)
          })
        }
      })
  }, [])

  return (
    <>
      {children}
    </>
  )
}