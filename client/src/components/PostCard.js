import React, { useContext, useState } from 'react'
import { UserContext } from '../tools/hooks'
import { CommentCard } from './CommentCard'
import { ToggleEditPost } from './ToggleEditPost'


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

export const PostCard = ({post, setPosts, handleDeletePost}) => {
  const { user, setUser } = useContext(UserContext)
  const [isEditPost, setIsEditPost] = useState(false)
  const [isCommentClicked, setIsCommentClicked] = useState(false)

  const handleCommentClick = () => {
    setIsCommentClicked(!isCommentClicked)
  }

  const handleEditPost = (e) => {
    setIsEditPost(!isEditPost)
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
      
    {isCommentClicked ?
      <div>{post.comments_data.map( data => 
        <CommentCard key={data.comment.id} data={data} />
      )}</div> :
      <div>
        {post.comments_data[0]? 
        <>
          <CommentCard data={post.comments_data[0]} /> 
          <button onClick={ handleCommentClick }>View more comments</button>
        </>: 
        null}        
      </div>    
    }
    </div>
  )
}
