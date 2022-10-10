import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../tools/hooks"

import Styles from "../styles/LoginSignup.style"

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export const UserDelete = () => {
  const { user, setUser } = useContext(UserContext)
  const [ setErrors ] = useState([])
  
  const params = useParams()
  const navigate = useNavigate()

  

  const handleDeleteSubmit = (e) => {

    fetch(`/users/${user.id}`, {
      method: 'DELETE'
    })
      .then(r => { 
      if(!r.ok) {
        r.json().then(data => setErrors(data.errors))
      }
    })

    fetch('/logout', {
      method: "DELETE"
    })
      .then(() => {
        setUser("")
        navigate('/login')
      })
  }

  if(user.username !== params.username ) {
    navigate('/') 
  }
  return (
    <Styles>
      <Container className="content-container">
        <Container className="delete-container">
          <Card className="delete-card">
              <h4>Are you sure you want to delete your account?</h4>
              <Button className="form-delete" onClick={handleDeleteSubmit}>Delete Acount</Button>            
          </Card>
        </Container>
      </Container>
    </Styles>
  )
}