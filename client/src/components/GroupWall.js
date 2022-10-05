import { useContext, useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { PageContext, UserContext } from "../tools/hooks"
import { PostCard } from "./PostCard"
import { LeftSidebar } from "./LeftSidebar"
import { RightSidebar } from "./RightSidebar"
import { UserGroupsContext, UserFriendsContext } from "../tools/hooks"

import Styles from '../styles/HomeWall.style'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const GroupWall = () => {
  const { user } = useContext(UserContext)
  const { page, setPage } = useContext(PageContext)
  const { userGroups, setUserGroups } = useContext(UserGroupsContext)
  const { userFriends, setUserFriends } = useContext(UserFriendsContext)
  const [ errors, setErrors ] = useState([])
  const [ group, setGroup ] = useState([])
  const [ isUserGroup, setIsUserGroup ] = useState(false)
  const [ membershipId, setMembershipId ] = useState(0)
  const [ posts, setPosts ] = useState([])
  const [ postLength, setPostLength ] = useState(10)
  const [ hasMore, setHasMore ] = useState(true)  

  const params = useParams()

  useEffect(() => {
    fetch('/user_groups')
      .then(r => {
        if(r.ok){
          r.json().then(data => {
            setUserGroups(data)
          })
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })

    fetch('/user_friends')
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setUserFriends(data)
          })
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }, [])

  if(page === 0){
    fetch(`/groups/${params.title}?page=0`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            console.log(data)
            if(data.user){
              console.log(data.user.is_in_group, data.user.membership_id)
              setIsUserGroup(data.user.is_in_group)  
              setMembershipId(data.user.membership_id) 
            }   
            setGroup(data.group)
            setPosts(data.posts)
            setPostLength(data.length)
            setPage(1)
            
          })
        }
      })
  }

  const fetchMore = () => {
    if (posts.length >= postLength) {
      return setHasMore(false)
    }
    setTimeout(() => {     
      setPage(page => page + 1) 
      fetch(`/groups/${params.title}?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {            
            setPosts(posts => posts.concat(data.posts))            
          })        
        }
      })      
    }, 500)
  }


  const handlePostSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('post[content]', e.target.content.value)
    data.append('post[user_id]', user.id)
    if(e.target.image.files[0]) {
      data.append('post[image]', e.target.image.files[0])
    }
    data.append('post[group_id]', group.id)
    submitToAPI(data)
    e.target.reset()
  }

  const submitToAPI = (data) => {    
    
    fetch('/posts', {
      method: 'POST',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(post => {          
          setPosts(posts => [post, ...posts])
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  const handleJoinGroup = () => {
    const data = new FormData()
    
    data.append('membership[group_id]', group.id)
    data.append('membership[user_id]', user.id)
  
    console.log(data)
    fetch(`/memberships`, {
      method: 'POST',
      body: data
    })
      .then(r => {
        if(r.ok){
          r.json().then(data => {
            setIsUserGroup(data.user.is_in_group)
            setMembershipId(data.user.membership_id)
            setUserGroups(groups => [...groups, data.group])
          })
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const handleLeaveGroup = () => {
    fetch(`/memberships/${membershipId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setIsUserGroup(false)
        setMembershipId(0)
        setUserGroups(groups => groups.filter(grp => grp.id !== group.id))
      })
  }

  const handleDeletePost = (post_id) => {
    fetch(`/posts/${post_id}`, {
      method: 'DELETE'
    })
      .then(() => {
        if(page > 0) {
          setPage(page => page - 1)
        } else {
          setPage(0)
        }
        setPosts(posts => posts.filter(p => post_id === !p.id))
      })
  }

  return(
    <Styles>
      <Container className="content-container" fluid="sm">
        <Row >
          { userGroups && userGroups.length > 0 ? 
            <Col className="d-none d-lg-flex">
              <LeftSidebar />
            </Col> 
          :
            <Col></Col>
          }
          <Col lg={8} id="scrollable-div" >
            <Card className="form-card">
              <div className="user-banner">                        
                <img src={group.avatar_url}  alt="group avatar" className='group-avatar-img'/>
                <h3 className='group-avatar-text'>{group.title}</h3>
                <h6>Founder: {group.founder}</h6>
              </div>
              <Container>
                <p className="">{group.description}</p>
              </Container>
              {isUserGroup ? 
                <Button type="submit" className="form-delete" onClick={handleLeaveGroup}>Leave this group</Button>
              :
                <Button type="submit" className="form-submit" onClick={handleJoinGroup}>Join this group</Button>                
              }
            </Card>
            { isUserGroup ?
            <Card className="form-card"> 
              <Form onSubmit={handlePostSubmit}>
              {errors ? errors.map(e => <section key={uuid()}>{e}</section>) : null}        
                <Form.Control as="textarea" type="text" name="content" placeholder={`Add something to the group, ${user.first_name}!`} className="form-textarea"/>
                <Form.Group className="form-file-inline">
                  <Form.Control type="file" name="image" className="form-file-input"/>
                  <Button type="suBmit" className="form-submit">Make Post</Button>
                </Form.Group>
              </Form>
            </Card> 
            : 
              null
            }
            
            <InfiniteScroll dataLength={posts.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={posts[0] ? <h4>Loading...</h4> : null}
            scrollableTarget="scrollable-div"
            endMessage={
              <h6>End of content</h6>
            }>{posts.map(post => {
              
              return (
              <>            
                <PostCard key={uuid()} post= {post} posts={posts} setPosts={setPosts} handleDeletePost={handleDeletePost} />
              </>
              )}
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