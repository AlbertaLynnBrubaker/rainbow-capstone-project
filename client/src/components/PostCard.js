import React, { useEffect, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { UserContext } from '../tools/hooks'
import { CommentCard } from './CommentCard'
import { ToggleEditPost } from './ToggleEditPost'

import Styles from '../styles/Post.style'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const PostCard = ({post, setPosts, handleDeletePost}) => {
  const { user } = useContext(UserContext)
  const [isEditPost, setIsEditPost] = useState(false)
  const [isCommentClicked, setIsCommentClicked] = useState(false)
  const [ comments, setComments ] = useState([])
  const [ errors, setErrors ] = useState([])

  const handleCommentClick = () => {
    setIsCommentClicked(!isCommentClicked)
  }

  const handleEditPost = () => {
    setIsEditPost(!isEditPost)
  }

  useEffect(() => {
    fetch(`/posts/${post.id}/comments`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            const newComments = data.map(comment => comment.comment_data)
            setComments(newComments)
          })
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })    
  },[])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('comment[content]', e.target.content.value)
    data.append('comment[user_id]', user.id)
    data.append('comment[post_id]', post.id)
    if(e.target.comment_image.files[0]) {
      data.append('comment[comment_image]', e.target.comment_image.files[0])
    }
    submitToAPI(data)
  }

  const submitToAPI = (data) => {    
    fetch('/comments', {
      method: 'POST',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(comment => { 
          setComments(comments => [...comments, comment.comment_data])
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  const onDeleteComment = (deletedCommentId) => { 
    const newComments = comments.filter(comment => comment.comment.id !== deletedCommentId)
    setComments(newComments)
  }

  const singleCommentHideButton = () => {
    if(isCommentClicked || comments.length <= 1) {
      return null
    } else {
      return <Button onClick={ handleCommentClick } className='form-submit'>View more comments...</Button>
    }
  }
  const hideComment = singleCommentHideButton()

  return (
    <Styles>
      <Card className='post-card'>     
      <ToggleEditPost post={post} setPosts={setPosts} isEditPost={isEditPost} setIsEditPost={setIsEditPost}/>
      {post.user.id === user.id ?
        <Container className='btn-container'>
          {isEditPost ? null: <Button onClick={handleEditPost} className="form-submit">Edit Post</Button>}
          <Button onClick={() => handleDeletePost(post.id)} className="form-submit">Remove Post</Button>
        </Container>
      :
        null
      }
      {user ?
        <Form onSubmit={handleCommentSubmit} className='comment-form'>
          <Form.Control as="textarea" placeholder='Add a comment' name='content' className='form-textarea'/>
          <Form.Group className="form-file-inline">
            <Form.Control type='file' name='comment_image' className='form-file-input'/>
            <Button type='submit' className='form-submit'>Add Comment</Button>
          </Form.Group>
        </Form> 
      : 
        null
      }      
      {isCommentClicked ?
        <Container>{comments.map( comment => {
          return <CommentCard key={uuid()} comment={comment} setComments={setComments} onDeleteComment={onDeleteComment} />
        }
        )}</Container> :
        <Container>
          {comments[0]? 
            <>
              <CommentCard key={uuid()} comment={comments[0]} setComments={setComments} onDeleteComment={onDeleteComment} /> 
              {hideComment}            
            </>
          : 
            null
          }        
        </Container>    
      }
      </Card> 
    </Styles>
  )
}
