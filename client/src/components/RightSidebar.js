import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { PageContext, UserContext, UserFriendsContext } from '../tools/hooks'
import { Link } from 'react-router-dom'

import Styles from '../styles/RightSidebar.style'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export const RightSidebar = () => {
  const { user } = useContext(UserContext)
  const { setPage } = useContext(PageContext)  
  const { userFriends } = useContext(UserFriendsContext)
  
  const friendsMap = userFriends.map( friend => {
    return(
      <Link key={uuid()} to={`/${friend.username}`} onClick={() => setPage(0)} >        
        <Container className="user-banner">
          <img src={friend.avatar_url}  alt="user avatar" className='user-avatar-img'/>
          <h5 className='user-avatar-text'>{friend.full_name}</h5>
        </Container>          
      </Link> 
    )
  })

  return (
    <Styles>
      <Container fluid>        
        <Card className="group-card">
          <h3 className="group-header">Your Friends</h3>
          {friendsMap}
        </Card>
      </Container>
    </Styles>
  )
}

