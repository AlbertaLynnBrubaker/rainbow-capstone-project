import { useContext } from "react"
import { AppContext, NavButton } from "../tools/hooks"


export const UserProfile = () => {
  const { user, setUser } = useContext(AppContext)

  console.log(user)
  return (
    <>
      <h1>UserProfile</h1>
      <h2>Hello, {user.username}</h2>
      <img src={user.avatar_url} alt= "user avatar" />
      <NavButton />
    </>
  )
}