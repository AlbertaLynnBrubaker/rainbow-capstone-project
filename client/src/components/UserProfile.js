import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../tools/hooks"
import { v4 as uuid } from "uuid"

import Styles from "../styles/LoginSignup.style"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export const UserProfile = () => {
  const { user, setUser } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    age: user.age,
    bio: user.bio,
    pronouns: user.pronouns
  })
  const pronouns = ["he/him", "she/her", "they/them"]
  
  const params = useParams()
  const navigate = useNavigate()

  const handleProfileChange = (e) => {
    setUserData({...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('user[username]', userData.username)
    data.append('user[email]', userData.email)
    data.append('user[full_name]', userData.full_name)
    data.append('user[bio]', userData.bio)
    data.append('user[pronouns]', userData.pronouns)
    data.append('user[age]', parseInt(userData.age))
    if(e.target.avatar.files[0]){data.append('user[avatar]', e.target.avatar.files[0])}
    submitToAPI(data)
  }

  const submitToAPI = (data) => {    
    
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(user => {          
          setUser(user)
          navigate('/')
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  const pronounArray = pronouns.map(pronoun => {
    return <option key={uuid()}>{pronoun}</option>
  })

  const renderPasswordForm = () => {
    navigate(`/${user.username}/password`)
  }

  const renderDeleteForm = () => {
    navigate(`/${user.username}/delete`)
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
              <Form onSubmit={handleProfileSubmit} className="form">                
                {errors ? errors.map(e => <section>{e}</section>) : null}                
                <Form.Group>
                  <Form.Group className="profile-password-container">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Button className="form-submit" onClick={renderPasswordForm}>Change Password</Button>
                  </Form.Group>
                  <Form.Control type="text" name="username" className="form-file-input" value={userData.username} onChange={handleProfileChange}/>                  
                </Form.Group>
                <Form.Group>
                  <Form.Group className="profile-password-container">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Button className="form-delete" onClick={renderDeleteForm}>Delete Account</Button>
                </Form.Group>
                  <Form.Control type="text" name="email" className="form-file-input" value={userData.email} onChange={handleProfileChange}/>
                </Form.Group>                
                <Form.Group>
                  <Form.Label htmlFor="full_name">Full Name</Form.Label>
                  <Form.Control type="text" name="full_name" className="form-file-input" value={userData.full_name} onChange={handleProfileChange}/>
                </Form.Group>
                {user.pronouns ?
                <Form.Group>
                  <Form.Label htmlFor="pronouns">Pronouns</Form.Label>
                  <Form.Select name="pronouns"  className="form-file-input" value={userData.pronouns} onChange={handleProfileChange}>
                    <option key={uuid()} disabled muted>{userData.pronouns}</option>
                    {pronounArray}
                  </Form.Select>
                </Form.Group>
                :
                <Form.Group>
                  <Form.Label htmlFor="pronouns">Pronouns</Form.Label>
                  <Form.Select name="pronouns" className="form-file-input" value={userData.pronouns} onChange={handleProfileChange}>
                    <option key={uuid()} default disabled muted>Select your pronouns</option>
                    {pronounArray}
                  </Form.Select>
                </Form.Group>
                }
                {user.age ?
                <Form.Group>
                  <Form.Label htmlFor="age">Age</Form.Label>
                  <Form.Control type="number" name="age"  className="form-file-input" value={userData.age} onChange={handleProfileChange}/>
                </Form.Group>
                :
                <Form.Group>
                  <Form.Label htmlFor="age">Age</Form.Label>
                  <Form.Control type="number" name="age" placeholder="Add an age here" className="form-file-input" value={userData.age} onChange={handleProfileChange}/>
                </Form.Group>
                }
                {user.bio ? 
                <Form.Group>
                  <Form.Label htmlFor="bio">Bio</Form.Label>
                  <Form.Control type="text" name="bio" className="form-file-input" value={userData.bio} onChange={handleProfileChange}/>
                </Form.Group>
                :
                <Form.Group>
                  <Form.Label htmlFor="bio">Bio</Form.Label>
                  <Form.Control type="text" name="bio" placeholder="Add a bio here" className="form-file-input" value={userData.bio} onChange={handleProfileChange}/>
              </Form.Group>
                }
                  <Form.Label htmlFor="avatar">Avatar</Form.Label>
                <Form.Group className="avatar-container">
                  <Form.Control type="file" name="avatar" className="form-file-input" id="form-avatar"/>
                  <img src={user.avatar_url} alt="user avatar" className="profile-img"/>                  
                </Form.Group>
                <Form.Text id="form-avatar" muted>square aspect ratio recommended</Form.Text>
                <Button className="form-submit" type="submit">Save Profile</Button>
              </Form>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Styles>
  )
}