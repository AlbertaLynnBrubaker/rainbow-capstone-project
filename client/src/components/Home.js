import React, { useContext, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { v4 as uuid } from 'uuid'

import { PageContext, UserContext, UserFriendsContext, UserGroupsContext } from "../tools/hooks"
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

export const Home = () => {
  const { user } = useContext(UserContext)
  const { userGroups, setUserGroups } = useContext(UserGroupsContext)
  const { userFriends, setUserFriends } = useContext(UserFriendsContext)
  const { page, setPage } = useContext(PageContext)
  const [ errors, setErrors ] = useState([])
  const [ posts, setPosts ] = useState([])
  
  const [ postLength, setPostLength ] = useState(10)
  const [ hasMore, setHasMore ] = useState(true)

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
    fetch(`/posts?page=0`)
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
      fetch(`/posts?page=${page}`)
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
            {user ? 
            <Card className="form-card">
              <Form onSubmit={handlePostSubmit}>
                {errors ? errors.map(e => <section key={uuid()}>{e}</section>) : null}
                <Form.Control as="textarea" type="text" name="content" placeholder={`What's on your mind, ${user.first_name}?`} className="form-textarea" />
                <Form.Group className="form-file-inline">            
                  <Form.Control type="file" name="image" className="form-file-input"/>
                  <Button className="form-submit" type="submit">Make Post</Button>
                </Form.Group>    
              </Form>
            </Card> : null}
            <InfiniteScroll dataLength={posts.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollable-div"
            endMessage={
              <h6>End of content</h6>
            }
            >{posts.map(post => {          
                return <PostCard key={uuid()} post= {post} posts={posts} setPosts={setPosts} handleDeletePost={handleDeletePost} />          
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
