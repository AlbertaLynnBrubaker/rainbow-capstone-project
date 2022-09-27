import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext, PageContext } from '../tools/hooks'

import Styles from '../styles/Comment.style'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//temp avatar styling
const style = {
  height: 40,
  width: 'auto',
  border: "1px solid black",
  borderRadius: 40,
  marginLeft: 6
}

//temp avatar styling
const imageStyle = {
  height: 400,
  width: 'auto',
  border: "1px solid black",
  
  marginLeft: 6
}


export const EditComment = ({comment, setComments, isEditComment, setIsEditComment, handleDeleteComment}) => {
  const { user, setUser } = useContext(UserContext)
  const { setPage } = useContext(PageContext)
  const [ errors, setErrors ] = useState([])
  const [ commentContent, setCommentContent] = useState(comment.comment.content)

  const handleContentChange = (e) => {
    setCommentContent(e.target.value)
  }

  const handlePatchSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('comment[content]', e.target.content.value)
    data.append('comment[user_id]', user.id)
    data.append('comment[post_id]', comment.comment.post_id)
    if(e.target.comment_image.files[0]) {
      data.append('comment[comment_image]', e.target.comment_image.files[0])
    }
    submitToAPI(data)
  }

  const submitToAPI = (data) => {    
    
    fetch(`/comments/${comment.comment.id}`, {
      method: 'PATCH',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(({comment_data}) => {          
          setComments(comments => comments.map(comment => {
            if(comment.comment.id === comment_data.comment.id) {
              return comment_data
            } else {
              return comment
            }
          }))
          setIsEditComment(!isEditComment)
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <Styles>
        <Container sm={10} className='comment-container'>
          <Link to={`/${comment.user.username}`} onClick={() => setPage(0)} className="user-banner">
            <img src={comment.user_avatar}  alt="user avatar" className='user-avatar-img'/>
            <h5 className='user-avatar-text'>{comment.user.full_name}</h5>          
          </Link>
      <Form onSubmit={handlePatchSubmit} className="edit-comment-form">
        <Container className='comment-img-container'>{comment.comment_image_url ? <img src={comment.comment_image_url} alt="post" className='comment-img' /> : null}</Container>
        <Form.Control as="textarea" name="content" value={commentContent} onChange={handleContentChange} className="form-textarea"/>
        <Form.Group className='form-file-inline'>
          <Form.Control type="File" name="comment_image" className="form-file-input"/>
          <Button type='submit' className='form-submit'>Edit Comment</Button>
        </Form.Group>
      </Form>      
      {comment.user.id === user.id ?
        <Container className="remove-container">          
          <Button onClick={handleDeleteComment} className='form-remove'>Remove Comment</Button>
        </Container>
        :
        null
      }
      </Container>
    </Styles>
  )
}
