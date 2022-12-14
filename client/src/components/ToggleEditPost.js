import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { PageContext, UserContext } from '../tools/hooks'

import Styles from '../styles/Post.style'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const ToggleEditPost = ({ post, setPosts, isEditPost, setIsEditPost }) => {
    const { user } = useContext(UserContext)
    const { setPage } = useContext(PageContext)
    const [ errors, setErrors ] = useState([])
    const [ postContent, setPostContent ] = useState(post.content)
    

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
          {post.user.pronouns ? <h6 className='user-avatar-text'>{`(${post.user.pronouns})`}</h6> : null}
          {post.group_data ? <><img src={post.group_data.avatar}  alt="group avatar" className='group-avatar-img'/>
          <h6 className='group-avatar-text'>{post.group_data.title}</h6></> : null}      
        </Link>
        <Form onSubmit={handlePatchSubmit} className="post-form" >
        {errors ? errors.map(e => <section key={uuid()}>{e}</section>) : null} 
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
          {post.user.pronouns ? <h6 className='user-avatar-text'>{`(${post.user.pronouns})`}</h6> : null}
        </Link>
        {post.group_data ? 
          <Link to={`/groups/${post.group_data.title}`} onClick={() => setPage(0)} className="user-banner">
            <h6 className='group-avatar-text'>from</h6>
            <img src={post.group_data.avatar}  alt="group avatar" className='group-avatar-img'/>
            <h6 className='group-avatar-text'>{post.group_data.title}</h6> 
          </Link>
        :
          null
        }
        
        <p>{post.content}</p>
        {post.image_url ? <img src={post.image_url} alt="post" className='post-img' /> : null}        
      </Styles>
    )
  }
  
}
