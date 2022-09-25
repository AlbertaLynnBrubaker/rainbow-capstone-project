import React, { useContext, useState } from 'react'
import { UserContext } from '../tools/hooks'

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
    <div>
      <h4>{comment.user.full_name}</h4>
      <img src= {comment.user_avatar} alt="user avatar" style={style}/>
      <form onSubmit={handlePatchSubmit}>
        <textarea name="content" value={commentContent} onChange={handleContentChange} />
        {comment.comment_image_url ? <img src={comment.comment_image_url} alt="post" style={imageStyle} /> : null}
        <input type="file" name="comment_image" />
        <button type='submit'>Edit Comment</button>
      </form>      
      {comment.user.id === user.id ?
        <>          
          <button onClick={handleDeleteComment}>Remove Comment</button>
        </>
        :
        null
      }
    </div>
  )
}
