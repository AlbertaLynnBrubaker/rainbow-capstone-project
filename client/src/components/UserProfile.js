import { NavButton } from "../tools/hooks"


export const UserProfile = ({user}) => {
  return (
    <>
      <h1>UserProfile</h1>
      <h2>Hello, {user.username}</h2>
      <NavButton />
    </>
  )
}