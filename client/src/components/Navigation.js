import React, { useContext } from 'react'
import { UserContext } from '../tools/hooks'
import { NavButton, Logout } from '../tools/hooks'

export const Navigation = () => {
  const { user, setUser } = useContext(UserContext)

  console.log(user)
  
  if (user) { 
    return (
      <div>
        <NavButton path={`/user-`} text={`Your Profile`}/>
        <Logout />
      </div>
  )} else if (!user) {
    return (
      <>
        <NavButton path="/login" text="Login" />
        <NavButton path="/signup" text="Signup" />
      </>
    )}
}

