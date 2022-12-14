import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"

import Styles from "../styles/LoginSignup.style"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    data.append('user[full_name]', e.target.full_name.value)
    // if(e.target.avatar.files[0]){data.append('user[avatar]', e.target.avatar.files[0])}
    submitToAPI(data)
  }

  const submitToAPI = (data) => {    
    
    fetch('/signup', {
      method: 'POST',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(() => {          
          navigate('/login')
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <Styles>
      <Container className="content-container">
        <Row>
          <Col></Col>
          <Col xs={10} md={8} lg={6} className="home-center">
            <Card className="form-card">
              <Form onSubmit={handleSignupSubmit} className="form">
                {errors ? errors.map(e => <section key={uuid()}>{e}</section>) : null}
                <Form.Group className="form-floating">
                  <Form.Control type="text" name="username" placeholder="floating" className="form-file-input"/>
                  <Form.Label htmlFor="username">Username</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating">
                  <Form.Control type="text" name="email" placeholder="floating" className="form-file-input"/>
                  <Form.Label htmlFor="email">Email</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating">
                <Form.Control type="password" name="password" placeholder="floating" className="form-file-input"/>
                <Form.Label htmlFor="password">Password</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating">
                  <Form.Control type="password" name="password_confirmation" placeholder="floating" className="form-file-input"/>
                  <Form.Label htmlFor="password_confirmation">Confirm Password</Form.Label>
                <Form.Group className="form-floating">
                  <Form.Control type="text" name="full_name" placeholder="floating" className="form-file-input"/>
                  <Form.Label htmlFor="full_name">Full Name</Form.Label>
                </Form.Group>
                </Form.Group>
                {/* <Form.Group className="form-floating">
                  <Form.Control type="file" name="avatar" placeholder="floating" className="form-file-input"/>
                  <Form.Label htmlFor="avatar">Avatar</Form.Label>
                </Form.Group> */}
                <Button className="form-submit" type="submit">Signup</Button>
              </Form>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Styles>
  )
}