import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../tools/hooks"


export const Login = () => {
  const { user, setUser } = useContext(UserContext)
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState([])

  console.log(user)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    setLoginData({...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(r => { if(r.ok) {
        r.json().then(user => {
          setUser(user)
          navigate('/')
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        {errors ? errors.map(e => <section>{e}</section>) : null}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={handleLogin}/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={handleLogin}/>
        <input type="submit" />
      </form>
    </>
  )
}