import React, { useContext } from 'react'
import { PageContext, UserContext } from '../tools/hooks'
import { Logout } from '../tools/hooks'
import { NavLink, Link } from 'react-router-dom'

import Styles from '../styles/LeftSidebar.style'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const LeftSidebar = () => {
  const { user } = useContext(UserContext)
  const { setPage } = useContext(PageContext)
  
  const handleNavClick = () => {
    setPage(0)
  }

  return (
    <Styles>
      <Container fluid className='wrapper'>
        <h2>I'm a user group</h2>
      </Container>
    </Styles>
  )
}

