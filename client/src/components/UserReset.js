import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { UserContext } from "../tools/hooks"

import Styles from "../styles/LoginSignup.style"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export const UserReset = () => {
  const { user, setUser } = useContext(UserContext)
  const [ errors, setErrors ] = useState([])
  const [ passwordData, setPasswordData ] = useState({
    username: user.username,
    full_name: user.full_name,
    email: user.email,
    password: '',
    password_confirmation: ''
  })
  
  const params = useParams()
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setPasswordData({...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleVerifySubmit = (e) => {
    e.preventDefault()

    const data = new FormData()

    data.append('user[username]', passwordData.username)
    data.append('user[email]', passwordData.email)
    data.append('user[full_name]', passwordData.full_name)
    data.append('user[password]', passwordData.password)
    data.append('user[password_confirmation]', passwordData.password_confirmation)

    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(user => {          
          setUser(user)
          navigate(`/${params.username}/profile`)
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  if(user.username !== params.username ) {
    navigate('/') 
  }
  return (
    <Styles>
      <Container className="content-container">
        <Row>
          <Col></Col>
          <Col xs={12} lg={10} className="home-center">
            <Card className="form-card">
              <Form onSubmit={handleVerifySubmit} className="form">
                {errors ? errors.map(e => <section key={uuid()}>{e}</section>) : null}
                <Form.Group>
                  <Form.Label htmlFor="password">New Password</Form.Label>
                  <Form.Control type="password" name="password" className="form-file-input" onChange={handlePasswordChange}/>
                </Form.Group>                
                <Form.Group>
                  <Form.Label htmlFor="password_confirmation">Confirm New Password</Form.Label>
                  <Form.Control type="password" name="password_confirmation" className="form-file-input" onChange={handlePasswordChange}/>
                </Form.Group>
                <Button className="form-submit" type="submit">Save New Password</Button>
              </Form>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Styles>
  )
}