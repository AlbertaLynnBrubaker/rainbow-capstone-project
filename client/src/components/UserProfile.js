import { useContext } from "react"
import { UserContext, NavButton } from "../tools/hooks"


export const UserProfile = () => {
  const { user, setUser } = useContext(UserContext)

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