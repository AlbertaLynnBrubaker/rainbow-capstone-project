import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavButton = ({path = "/", text = "Back"}) => {

  const nav = useNavigate()
  return (
    <button onClick={() => nav(path)}>
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

export const Logout = () => {
  const { user, setUser } = useContext(UserContext)
  const nav = useNavigate()
  
  const handleLogout = () => {
    fetch('/logout', {
      method: "DELETE"
    })
      .then(() => {
        setUser("")
        nav('/login')
      })
  }

  return(
    <button onClick={handleLogout}>Logout</button>
  )
}

export const AuthRoute = ({children}) => {
  const {user, setUser} = useContext(UserContext)
  const nav = useNavigate()

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