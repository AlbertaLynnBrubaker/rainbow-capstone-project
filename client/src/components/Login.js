import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext, UserGroupsContext, UserFriendsContext } from "../tools/hooks"

import Styles from "../styles/LoginSignup.style"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export const Login = () => {
  const { setUser } = useContext(UserContext)
  const { setUserGroups } = useContext(UserGroupsContext)
  const { setUserFriends } = useContext(UserFriendsContext)
  const [ loginData, setLoginData ] = useState({
    username: "",
    password: ""
  })
  const [ errors, setErrors ] = useState([])

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
          setUser(user.profile)
          setUserFriends(user.friends)
          setUserGroups(user.groups)
          navigate('/')
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <Styles>
      <Container className="content-container" >
        <Row>
          <Col></Col>
          <Col xs={10} md={8} lg={6} className="home-center">
            <Card className="form-card">
              <Form onSubmit={handleLoginSubmit} className="form">
                {errors ? errors.map(e => <section>{e}</section>) : null}
                <Form.Group className="form-floating">
                  <Form.Control type="text" name="username" onChange={handleLogin} placeholder="floating" className="form-file-input"/>
                  <Form.Label htmlFor="username">Username</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating">
                <Form.Control type="password" name="password" onChange={handleLogin} placeholder="floating" className="form-file-input"/>
                <Form.Label htmlFor="password">Password</Form.Label>
                </Form.Group>
                <Button className="form-submit" type="submit">Login</Button>
              </Form>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Styles>
  )
}