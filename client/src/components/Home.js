import { useContext } from "react"
import { AppContext, Logout, NavButton } from "../tools/hooks"

export const Home = () => {
  const { user, setUser } = useContext(AppContext)

  if(user) {
    return(
      <>
        <h1>Home</h1>
        <NavButton path={`/user-${user.username.toLowerCase()}`} text={`Your Profile`}/>
        <Logout setUser={setUser} />
      </>
    )
  } else {
  return (
    <>
      <h1>Home</h1>
      <NavButton path="/login" text="Login" />
      <NavButton path="/signup" text="Signup" />
    </>
  )}
}