import React, { useContext } from 'react'
import { PageContext, UserContext } from '../tools/hooks'
import { NavButton, Logout } from '../tools/hooks'
import { NavLink, Link } from 'react-router-dom'

import Styles from '../styles/Navigation.style'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { BsPersonCircle } from 'react-icons/bs'
import { HiPencil, HiOutlinePencil } from 'react-icons/hi'
import { MdHome, MdOutlineHome, MdLock, MdOutlineLockOpen } from 'react-icons/md'
import { RiProfileFill, RiProfileLine } from 'react-icons/ri'

//temp avatar styling
const style = {
  height: 45,
  width: 'auto',
  border: "1px solid black",
  borderRadius: 45,
  marginLeft: 6
}

//temp avatar styling
const imageStyle = {
  height: 400,
  width: 'auto',
  border: "1px solid black",
  
  marginLeft: 6
}

export const Navigation = ({logoUrl}) => {
  const { user, setUser } = useContext(UserContext)
  const { setPage } = useContext(PageContext)
  
  const handleNavClick = () => {
    setPage(0)
  }

  console.log(user)
 
    return (
      <Styles>
        <Container fluid className='wrapper'>
          <img src={logoUrl} alt="rainbow-logo" className='logo' />      
          {user ?
            <Container className='center-flex'>
              <NavLink to="/" className='btn-nav' onClick={handleNavClick}><MdHome className='btn-icon'/></NavLink>
              <NavLink to={`/${user.username}`} className='btn-nav' onClick={handleNavClick}><RiProfileFill className='btn-icon'/></NavLink>
              <NavLink to={`/${user.username}/profile`} className='btn-nav' onClick={handleNavClick}><BsPersonCircle className='btn-icon'/></NavLink>
              <Logout />
            </Container>
          :
            <Container className='center-flex'>
              <NavLink to="/" className='btn-nav' onClick={handleNavClick}><MdHome className='btn-icon'/></NavLink>
              <NavLink to="/login" className='btn-nav' onClick={handleNavClick}><MdLock className='btn-icon'/></NavLink>
              <NavLink to="/signup" className='btn-nav' onClick={handleNavClick}><HiPencil className='btn-icon'/></NavLink>
            </Container>
          }
          {user ? 
          <Link to={`/${user.username}` } onClick={() => setPage(0)}>          
            <img src={user.avatar_url} style={style} alt="user avatar" />
          </Link>
          : null
          }
        </Container>
      </Styles>
  )
}

