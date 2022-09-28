import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageContext, UserContext } from '../tools/hooks'

import Styles from '../styles/Post.style'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const ToggleEditPost = ({ post, setPosts, isEditPost, setIsEditPost }) => {
    const { user } = useContext(UserContext)
    const { setPage } = useContext(PageContext)
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
      <Styles>
        <Link to={`/${post.user.username}`} onClick={() => setPage(0)} className="user-banner">
          <img src={post.user_avatar}  alt="user avatar" className='user-avatar-img'/>
          <h5 className='user-avatar-text'>{post.user.full_name}</h5>
          <h6 className='user-avatar-text'>{post.user.pronouns}</h6>      
        </Link>
        <Form onSubmit={handlePatchSubmit} className="post-form" >

          {post.image_url ? <img src={post.image_url} alt="post" className="post-img" /> : null}
          <Form.Control as="textarea" name="content" value={postContent} onChange={handleContentChange} className="form-textarea" />          
          <Form.Group className="form-file-inline">
            <Form.Control type='file' name='image' className='form-file-input'/>
            <Button type='submit' className='form-submit'>Edit Post</Button>
          </Form.Group>
        </Form>
        
      </Styles>
    )
  } else {
    return(
      <Styles>
        <Link to={`/${post.user.username}` } onClick={() => setPage(0)} className="user-banner">
          <img src={post.user_avatar}  alt="user avatar" className='user-avatar-img'/>
          <h5 className='user-avatar-text'>{post.user.full_name}</h5>
          <h6 className='user-avatar-text'>{post.user.pronouns}</h6>
        </Link>
        <p>{post.content}</p>
        {post.image_url ? <img src={post.image_url} alt="post" className='post-img' /> : null}        
      </Styles>
    )
  }
  
}
