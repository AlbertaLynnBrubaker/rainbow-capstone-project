import { useContext, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
import { v4 as uuid } from 'uuid'

import { PageContext, UserContext, UserFriendsContext, UserGroupsContext } from "../tools/hooks"
import Styles from '../styles/HomeWall.style'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { LeftSidebar } from "./LeftSidebar"
import { RightSidebar } from "./RightSidebar"


export const UserFriends = () => {
  const { user } = useContext(UserContext)
  const { page, setPage } = useContext(PageContext)
  const { userGroups, setUserGroups } = useContext(UserGroupsContext)
  const { userFriends, setUserFriends } = useContext(UserFriendsContext)
  const [ errors, setErrors ] = useState([])
  const [ friendsLength, setFriendsLength ] = useState(10)
  const [ hasMore, setHasMore ] = useState(true)
  

  if(page === 0){    
    fetch(`/friends_list?page=0`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setUserFriends(data.friends)
            setFriendsLength(data.length)
            setPage(1)     
          })        
        }
      })    
  }

  const fetchMore = () => {
    if (userFriends.length >= friendsLength) {
      return setHasMore(false)
    }
    setTimeout(() => {     
      setPage(page => page + 1)
      fetch(`/user_friends?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {            
            setUserFriends(userFriends => userFriends.concat(data.friends))            
          })        
        }
      })      
    }, 500)
  }

  return(   
    <Styles>
      <Container className="content-container" fluid="sm">
        <Row >
          {userGroups.length > 0 ? 
            <Col className="d-none d-lg-flex">
              <LeftSidebar />
            </Col> 
          :
            <Col></Col>
          }
          <Col lg={8} id="scrollable-div" className="groups-list-container" >            
            <InfiniteScroll dataLength={userFriends.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollable-div"
            endMessage={
              <h6>End of content</h6>
            }
            >{userFriends.map(friend => {          
                return (                  
                  <Link to={`/${friend.username}`} onClick={() => setPage(0)} >
                    <Card className="group-card">
                      <Container className="user-banner">
                        <img src={friend.avatar_url}  alt="group avatar" className='user-avatar-img'/>
                        <h5 className='user-avatar-text'>{friend.full_name}</h5>
                      </Container>      
                    </Card>
                  </Link> 
                )        
              }
            )}</InfiniteScroll>
        </Col>
        {userFriends && userFriends.length > 0 ? 
          <Col className="d-none d-lg-flex">
            <RightSidebar />
          </Col> 
        :
          <Col></Col>
        }
        </Row>        
      </Container>
    </Styles>    
  )
}
