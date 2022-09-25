import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../tools/hooks'
import { CommentCard } from './CommentCard'
import { ToggleEditPost } from './ToggleEditPost'


// //temp avatar styling
// const style = {
//   height: 40,
//   width: 'auto',
//   border: "1px solid black",
//   borderRadius: 40,
//   marginLeft: 6
// }

// //temp avatar styling
// const imageStyle = {
//   height: 400,
//   width: 'auto',
//   border: "1px solid black",
  
//   marginLeft: 6
// }

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

  return (
    <div>      
      <ToggleEditPost post={post} setPosts={setPosts} isEditPost={isEditPost} setIsEditPost={setIsEditPost}/>
      <br/>
      {post.user.id === user.id ?
        <>
          {isEditPost ? null: <button onClick={handleEditPost}>Edit Post</button>}
          <button onClick={() => handleDeletePost(post.id)}>Remove Post</button>
        </>
      :
        null
      }
      {user ?
        <form onSubmit={handleCommentSubmit}>
          <textarea placeholder='Add a comment' name='content'/>
          <input type='file' name='comment_image' />
          <input type='submit' />
        </form> 
      : 
        null
      }      
      {isCommentClicked ?
        <div>{comments.map( comment => {
          return <CommentCard key={comment.id} comment={comment} onDeleteComment={onDeleteComment} />
        }
        )}</div> :
        <div>
          {comments[0]? 
          <>
            <CommentCard key={comments[0].id} comment={comments[0]} onDeleteComment={onDeleteComment} /> 
            {isCommentClicked ? null : <button onClick={ handleCommentClick }>View more comments</button>}
          </>: 
          null}        
        </div>    
      }
    </div>
  )
}
