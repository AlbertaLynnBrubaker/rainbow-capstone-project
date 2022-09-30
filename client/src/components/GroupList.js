import { useContext, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
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
import { LeftSidebar } from "./LeftSidebar"


export const GroupList = () => {
  const { user } = useContext(UserContext)
  const { page, setPage } = useContext(PageContext)
  const [ errors, setErrors ] = useState([])
  const [ groups, setGroups ] = useState([1])
  const [ groupsLength, setGroupsLength ] = useState(10)
  const [ hasMore, setHasMore ] = useState(true)
  

  if(page === 0){    
    fetch(`/groups?page=0`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            console.log(data)
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


  // const handlePostSubmit = (e) => {
  //   e.preventDefault()
  //   const data = new FormData()

  //   data.append('post[content]', e.target.content.value)
  //   data.append('post[user_id]', user.id)
  //   if(e.target.image.files[0]) {
  //     data.append('post[image]', e.target.image.files[0])
  //   }
  //   submitToAPI(data)
  //   e.target.reset()
  // }

  // const submitToAPI = (data) => {    
    
  //   fetch('/posts', {
  //     method: 'POST',
  //     body: data
  //   })
  //     .then(r => { 
  //     if(r.ok) {
  //       r.json().then(post => {          
  //         setPosts(posts => [post, ...posts])
  //       })
  //     } else {
  //       r.json().then(data => setErrors(data.errors))
  //     }
  //   })
  // }

  // const handleDeletePost = (post_id) => {
  //   fetch(`/posts/${post_id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(() => {
  //       if(page > 0) {
  //         setPage(page => page - 1)
  //       } else {
  //         setPage(0)
  //       }
  //       setPosts(posts => posts.filter(p => post_id === !p.id))
  //     })
  // }

  return(   
    <Styles>
      <Container className="content-container" fluid="sm">
        <Row >
          {groups.length > 0 ? 
            <Col className="d-none d-lg-flex">
              <LeftSidebar />
            </Col> 
          :
            <Col></Col>
          }
          <Col lg={8} id="scrollable-div" className="groups-list-container" >
            {/* {user ? 
            <Card className="form-card">
              <Form onSubmit={handlePostSubmit}>
                {errors ? errors.map(e => <section key={uuid()}>{e}</section>) : null}
                <Form.Control as="textarea" type="text" name="content" placeholder={`What's on your mind, ${user.first_name}?`} className="form-textarea" />
                <Form.Group className="form-file-inline">            
                  <Form.Control type="file" name="image" className="form-file-input"/>
                  <Button className="form-submit" type="submit">Make Post</Button>
                </Form.Group>    
              </Form>
            </Card> : null} */}
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
                  <Link to={`/groups/${group.title}`} onClick={() => setPage(0)} >
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
        <Col className="d-none d-lg-flex"></Col>
        </Row>        
      </Container>
    </Styles>    
  )
}
