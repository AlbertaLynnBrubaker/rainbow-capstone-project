import { useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const NavButton = ({path = "/", text = "Back"}) => {

  const nav = useNavigate()
  return (
    <button onClick={() => nav(path)}>
      {text}
    </button>
  )
}

export const AppContext = createContext("")

export const Logout = ({setUser}) => {

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
  const {user, setUser} = useContext(AppContext)
  const nav = useNavigate()

  useEffect(() => {
    fetch('/me')
      .then(r => {
        if(r.ok) {
          r.json().then(user => {
            setUser(user)
          })
        } else {
          nav('/login')
        }
      })
  }, [])

  return (
    <>
      {children}
    </>
  )
}