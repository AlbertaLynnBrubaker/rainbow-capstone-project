import { useContext, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { v4 as uuid } from 'uuid'

import { PageContext, UserContext } from "../tools/hooks"
import { PostCard } from "./PostCard"
import Styles from '../styles/HomeWall.style'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export const Home = () => {
  const { user } = useContext(UserContext)
  const { page, setPage } = useContext(PageContext)
  const [ errors, setErrors ] = useState([])
  const [posts, setPosts] = useState([])
  const [postLength, setPostLength] = useState(10)
  const [hasMore, setHasMore] = useState(true)
  

  useEffect(() => {
    fetch(`/posts?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setPosts(data.posts)
            setPostLength(data.length)     
          })        
        }
      })
  }, [])

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
        if(page >= 0) {
          setPage(page => page - 1)
        } else {
          setPage(0)
        }
        setPosts(posts => posts.filter(p => post_id === !p.id))
      })
  }

  console.log(posts)

    return(   
      <Styles>
        <Container className="content-container" fluid="sm">
          <Row >
            <Col ></Col>
            <Col lg={8} id="scrollable-div" >
              {user ? 
              <Card className="form-card">
                <Form onSubmit={handlePostSubmit}>                
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
          <Col ></Col>
          </Row>        
        </Container>
      </Styles>    
    )
}
