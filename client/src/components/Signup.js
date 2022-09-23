import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { NavButton } from "../tools/hooks"

export const Signup = () => {
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('user[username]', e.target.username.value)
    data.append('user[email]', e.target.email.value)
    data.append('user[password]', e.target.password.value)
    data.append('user[password_confirmation]', e.target.password_confirmation.value)
    data.append('user[avatar]', e.target.avatar.files[0])
    console.log(data)
    submitToAPI(data)
  }

  const submitToAPI = (data) => {    
    
    fetch('/signup', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(user => {
          
          navigate('/login')
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <>
      {errors ? errors.map(e => <section>{e}</section>) : null}
      <form onSubmit={handleSignupSubmit}>
        
        <label htmlFor="username">Username:</label>
        <input type="text" name="username"/>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email"/>
        <label htmlFor="avatar">Avatar:</label>
        <input type="file" name="avatar"/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password"/>
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input type="password" name="password_confirmation"/>
        <input type="submit"/>
      </form>
    </>
  )
}