import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../tools/hooks'
import { EditComment } from './EditComment'

//temp image styling
const style = {
  height: 40,
  width: 'auto',
  border: "1px solid black",
  borderRadius: 40,
  margin: 6
}

//temp avatar styling
const imageStyle = {
  height: 400,
  width: 'auto',
  border: "1px solid black",
  
  marginLeft: 6
}

export const CommentCard = ({comment, setComments, onDeleteComment}) => {
  const { user } = useContext(UserContext)
  
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
      <div>
        <h4>{comment.user.full_name}</h4>
        <img src= {comment.user_avatar} alt="user avatar" style={style}/>
        <h5>{comment.comment.content}</h5>
        {comment.comment_image_url ? <img src={comment.comment_image_url} alt="comment" style={imageStyle} /> : null}
        {comment.user.id === user.id ?
          <>
            {isEditComment ? null: <button onClick={handleEditComment}>Edit Comment</button>}
            <button onClick={handleDeleteComment}>Remove Comment</button>
          </>
          :
          null
        }
      </div>
    )
  }
}
