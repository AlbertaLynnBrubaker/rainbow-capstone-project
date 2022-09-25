import React, { useContext } from 'react'
import { UserContext } from '../tools/hooks'
import { NavButton, Logout } from '../tools/hooks'

export const Navigation = () => {
  const { user, setUser } = useContext(UserContext)
  
  if (user) { 
    return (
      <div>
        <NavButton path="/" text= "Home" />
        <NavButton path={`/user-${user.username.toLowerCase()}`} text={`Your Profile`}/>
        <Logout />
      </div>
  )} else if (!user) {
    return (
      <>
        <NavButton path="/" text= "Home" />
        <NavButton path="/login" text="Login" />
        <NavButton path="/signup" text="Signup" />
      </>
    )}
}

