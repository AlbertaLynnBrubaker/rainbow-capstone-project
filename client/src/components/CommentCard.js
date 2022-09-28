import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageContext, UserContext } from '../tools/hooks'
import { EditComment } from './EditComment'

import Styles from '../styles/Comment.style'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export const CommentCard = ({comment, setComments, onDeleteComment}) => {
  const { user } = useContext(UserContext)
  const { setPage } = useContext(PageContext)
  const [ errors, setErrors ] = useState([])
  
  const [ isEditComment, setIsEditComment ] = useState(false)
  
  const handleEditComment = () => {
    setIsEditComment(!isEditComment)
  }

  const handleDeleteComment = () => {
    fetch(`/comments/${comment.comment.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        onDeleteComment(comment.comment.id)
      })
  }

  if(isEditComment) {
    return <EditComment comment={comment} setComments={setComments}  isEditComment={isEditComment} setIsEditComment={setIsEditComment} handleDeleteComment={handleDeleteComment}/>
  } else {
    return (
      <Styles>
        <Container sm={10} className='comment-container'>
          <Link to={`/${comment.user.username}`} onClick={() => setPage(0)} className="user-banner">
            <img src={comment.user_avatar}  alt="user avatar" className='user-avatar-img'/>
            <h5 className='user-avatar-text'>{comment.user.full_name}</h5>
            <h6 className='user-avatar-text'>{comment.user.pronouns}</h6>      
          </Link>
          <p>{comment.comment.content}</p>
          <Container className='comment-img-container'>{comment.comment_image_url ? <img src={comment.comment_image_url} alt="comment" className='comment-img' /> : null}</Container>
          {comment.user.id === user.id ?
            <Container className='btn-container'>
              {isEditComment ? null: <Button onClick={handleEditComment} className='form-submit'>Edit Comment</Button>}
              <Button onClick={handleDeleteComment} className='form-submit'>Remove Comment</Button>
            </Container>
            :
            null
          }
        </Container>
      </Styles>
    )
  }
}
