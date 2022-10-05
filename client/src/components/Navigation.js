import React, { useContext } from 'react'
import { PageContext, UserContext } from '../tools/hooks'
import { Logout } from '../tools/hooks'
import { NavLink, Link } from 'react-router-dom'

import Styles from '../styles/Navigation.style'
import Container from 'react-bootstrap/Container'
import { BsPersonCircle, BsPeopleFill } from 'react-icons/bs'
import { HiPencil, HiUserGroup } from 'react-icons/hi'
import { MdHome, MdLock } from 'react-icons/md'
import { RiProfileFill } from 'react-icons/ri'

export const Navigation = ({logoUrl}) => {
  const { user } = useContext(UserContext)
  const { setPage } = useContext(PageContext)
  
  const handleNavClick = () => {
    setPage(0)
  }
 
  return (
    <Styles>
      <Container fluid className='wrapper'>
        <img src={logoUrl} alt="rainbow-logo" className='logo' />      
        {user ?
          <Container className='center-flex'>
            <NavLink to="/" className='btn-nav' onClick={handleNavClick}><MdHome className='btn-icon'/></NavLink>
            <NavLink to={`/groups`} className='btn-nav' onClick={handleNavClick}><HiUserGroup className='btn-icon'/></NavLink>
            <NavLink to={`/${user.username}`} className='btn-nav' onClick={handleNavClick}><RiProfileFill className='btn-icon'/></NavLink>            
            <NavLink to={`/${user.username}/friends`} className='btn-nav' onClick={handleNavClick}><BsPeopleFill className='btn-icon'/></NavLink>
            <NavLink to={`/${user.username}/profile`} className='btn-nav' onClick={handleNavClick}><BsPersonCircle className='btn-icon'/></NavLink>
            <Logout />
          </Container>
        :
          <Container className='center-flex'>
            <NavLink to="/" className='btn-nav' onClick={handleNavClick}><MdHome className='btn-icon'/></NavLink>
            <NavLink to={`/groups`} className='btn-nav' onClick={handleNavClick}><HiUserGroup className='btn-icon'/></NavLink>
            <NavLink to="/login" className='btn-nav' onClick={handleNavClick}><MdLock className='btn-icon'/></NavLink>
            <NavLink to="/signup" className='btn-nav' onClick={handleNavClick}><HiPencil className='btn-icon'/></NavLink>
          </Container>
        }
        {user ? 
        <Link to={`/${user.username}`} onClick={() => setPage(0)} className="user-banner">
          <img src={user.avatar_url}  alt="user avatar" className='user-avatar-img'/>
        </Link>
        : null
        }
      </Container>
    </Styles>
  )
}

