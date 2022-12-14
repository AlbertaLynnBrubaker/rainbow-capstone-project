import React, { useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { PageContext, UserContext, UserGroupsContext } from '../tools/hooks'
import { Link } from 'react-router-dom'

import Styles from '../styles/LeftSidebar.style'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export const LeftSidebar = () => {
  const { user } = useContext(UserContext)
  const { setPage } = useContext(PageContext)  
  const { userGroups } = useContext(UserGroupsContext)
  
  const groupMap = userGroups.map( group => {
    return(
      <Link key={uuid()} to={`/groups/${group.title}`} onClick={() => setPage(0)} >        
        <Container className="user-banner">
          <img src={group.avatar_url}  alt="group avatar" className='user-avatar-img'/>
          <h5 className='user-avatar-text'>{group.title}</h5>
        </Container>          
      </Link> 
    )
  })

  return (
    <Styles>
      <Container fluid>        
        <Card className="group-card">
          <h3 className="group-header">Your Groups</h3>
          {groupMap}
        </Card>
      </Container>
    </Styles>
  )
}

