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

export const ToggleEditPost = ({ post, setPosts, isEditPost, setIsEditPost }) => {
    const { user } = useContext(UserContext)
    const [ postContent, setPostContent ] = useState(post.content)
    const [errors, setErrors] = useState([])

  const handleContentChange = (e) => {
    setPostContent(e.target.value)
  }

  const handlePatchSubmit = (e) => {
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
    
    fetch(`/posts/${post.id}`, {
      method: 'PATCH',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(updatedPost => {          
          setPosts(posts => posts.map(post => {
            if(post.id === updatedPost.id) {
              return updatedPost
            } else {
              return post
            }
          }))
          setIsEditPost(!isEditPost)
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  if(isEditPost) {
    return(
      <>
        <h1>{post.user.full_name}</h1>
        <img src={post.user_avatar} style={style} alt="user avatar" />
        <form onSubmit={handlePatchSubmit}>
          <textarea name="content" value={postContent} onChange={handleContentChange} />
          {post.image_url ? <img src={post.image_url} alt="post" style={imageStyle} /> : null}
          <input type="file" name="image" />
          <button type='submit'>Edit Post</button>
        </form>
        
      </>
    )
  } else {
    return(
      <>
        <h1>{post.user.full_name}</h1>
        <img src={post.user_avatar} style={style} alt="user avatar" />
        <h4>{post.content}</h4>
        {post.image_url ? <img src={post.image_url} alt="post" style={imageStyle} /> : null}       
      </>
    )
  }
  
}
