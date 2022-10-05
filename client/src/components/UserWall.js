import { useContext, useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { PageContext, UserContext, UserGroupsContext, UserFriendsContext } from "../tools/hooks"
import { PostCard } from "./PostCard"
import { LeftSidebar } from "./LeftSidebar"
import { RightSidebar } from "./RightSidebar"

import Styles from '../styles/HomeWall.style'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const UserWall = () => {
  const { user } = useContext(UserContext)
  const { userGroups, setUserGroups } = useContext(UserGroupsContext)
  const { userFriends, setUserFriends } = useContext(UserFriendsContext)
  const { page, setPage } = useContext(PageContext)
  const [ errors, setErrors ] = useState([])
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
    fetch(`/${params.username}?page=0`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
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
      fetch(`/${params.username}?page=${page}`)
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

  const handleAddFriend = () => {
    const data = new FormData()
    
    data.append('user_friend[logged_user_id]', user.id)
    data.append('user_friend[friend_id]', posts[0].user.id)

    fetch(`/user_friends`, {
      method: 'POST',
      body: data
    })
      .then(r => {
        if(r.ok){
          r.json().then(data => {
            console.log(data)
            setUserFriends(friends => [...friends, data.friend])
          })
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const handleUnfriend = () => {
    fetch(`/user_friends/${posts[0].user.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setUserFriends(friends => friends.filter(frd => frd.id !== posts[0].user.id))
      })
  }

  const friendsFilter = userFriends.find(friend => 
    friend.username === params.username
  )

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
          <Col lg={8} id="scrollable-div" >
            { posts[0] ? <Card className="form-card">
              <Container className="user-card">
                <img src={posts[0].user_avatar}  alt="user avatar" className='user-card-img'/>
                <h5 className='user-avatar-text'>{posts[0].user.full_name}</h5>
                { posts[0].user.pronouns ? <h6 className='user-avatar-text'>{`(${posts[0].user.pronouns})`}</h6> : null }
              </Container>
              <Container>
                { posts[0].user.bio ? <p className='user-avatar-text'>Bio: {posts[0].user.bio}</p> : null }
                { posts[0].user.bio ? <p className='user-avatar-text'>Age: {posts[0].user.age}</p> : null } 
                {user.username === params.username ? null:  <Container>{ friendsFilter ? 
                  <Button type="submit" className="form-delete" onClick={handleUnfriend}>Unfriend</Button>
                :
                  <Button type="submit" className="form-submit" onClick={handleAddFriend}>Add Friend</Button>  
                }
                </Container>}
              </Container>
            </Card>   : null  }       
            {user.username === params.username ?
            <Card className="form-card"> 
              <Form onSubmit={handlePostSubmit}>
              {errors ? errors.map(e => <section key={uuid()}>{e}</section>) : null}        
                <Form.Control as="textarea" type="text" name="content" placeholder={`Spread your agenda, ${user.first_name}!`} className="form-textarea"/>
                <Form.Group className="form-file-inline">
                  <Form.Control type="file" name="image" className="form-file-input"/>
                  <Button type="suBmit" className="form-submit">Make Post</Button>
                </Form.Group>
              </Form>
            </Card> : null}
            
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