import { useContext, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
import { v4 as uuid } from 'uuid'

import { PageContext, UserContext, UserFriendsContext, UserGroupsContext } from "../tools/hooks"
import { PostCard } from "./PostCard"
import Styles from '../styles/HomeWall.style'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LeftSidebar } from "./LeftSidebar"
import { RightSidebar } from "./RightSidebar"


export const GroupList = () => {
  const { user } = useContext(UserContext)
  const { page, setPage } = useContext(PageContext)
  const { userGroups, setUserGroups } = useContext(UserGroupsContext)
  const { userFriends, setUserFriends } = useContext(UserFriendsContext)
  const [ errors, setErrors ] = useState([])
  const [ groups, setGroups ] = useState([1])
  const [ groupsLength, setGroupsLength ] = useState(10)
  const [ hasMore, setHasMore ] = useState(true)
  

  if(page === 0){    
    fetch(`/groups?page=0`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setGroups(data.groups)
            setGroupsLength(data.length)
            setPage(1)     
          })        
        }
      })    
  }

  const fetchMore = () => {
    if (groups.length >= groupsLength) {
      return setHasMore(false)
    }
    setTimeout(() => {     
      setPage(page => page + 1)
      fetch(`/groups?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {            
            setGroups(groups => groups.concat(data.groups))            
          })        
        }
      })      
    }, 500)
  }

  return(   
    <Styles>
      <Container className="content-container" fluid="sm">
        <Row >
        {userGroups && userGroups.length > 0 ? 
            <Col className="d-none d-lg-flex">
              <LeftSidebar />
            </Col> 
          :
            <Col></Col>
          }
          <Col lg={8} id="scrollable-div" className="groups-list-container" >
            
            <InfiniteScroll dataLength={groups.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollable-div"
            endMessage={
              <h6>End of content</h6>
            }
            >{groups.map(group => {          
                return (                  
                  <Link key={uuid()} to={`/groups/${group.title}`} onClick={() => setPage(0)} >
                    <Card className="group-card">
                      <Container className="user-banner">
                        <img src={group.avatar_url}  alt="group avatar" className='user-avatar-img'/>
                        <h5 className='user-avatar-text'>{group.title}</h5>
                      </Container>
                      <h6 className='user-avatar-text'>{group.blurb}</h6>      
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
