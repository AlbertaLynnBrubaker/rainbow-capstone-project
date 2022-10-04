import React, { useContext, useEffect } from 'react'
import { PageContext, UserContext, UserGroupsContext } from '../tools/hooks'
import { Logout } from '../tools/hooks'
import { NavLink, Link } from 'react-router-dom'

import Styles from '../styles/LeftSidebar.style'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const LeftSidebar = () => {
  const { user } = useContext(UserContext)
  const { setPage } = useContext(PageContext)  
  const { userGroups, setUserGroups } = useContext(UserGroupsContext)
  
  const handleNavClick = () => {
    setPage(0)
  }

  const groupMap = userGroups.map( group => {
    return(
      <Link to={`/groups/${group.title}`} onClick={() => setPage(0)} >        
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

