import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { NavButton } from "../tools/hooks"

export const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const handleSignup = (e) => {
    setSignupData({...signupData,
      [e.target.name]: e.target.value
    })
  }

  console.log(signupData)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(user => {
          console.log(user)
          navigate('/login')
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSignupSubmit}>
        {errors ? errors.map(e => <section>{e}</section>) : null}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={handleSignup}/>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={handleSignup}/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={handleSignup}/>
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input type="password" name="password_confirmation" onChange={handleSignup}/>
        <input type="submit"/>
      </form>
      <NavButton />
    </>
  )
}