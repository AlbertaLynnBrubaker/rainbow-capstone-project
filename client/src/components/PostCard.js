import React, { useState } from 'react'
import { CommentCard } from './CommentCard'

//temp image styling
const style = {
  height: 40,
  width: 'auto',
  border: "1px solid black",
  borderRadius: 40,
  marginLeft: 6
}

export const PostCard = ({post}) => {
  const [isCommentClicked, setIsCommentClicked] = useState(false)

  const handleCommentClick = () => {
    setIsCommentClicked(!isCommentClicked)
  }
  
  return (
    <div>      
      <h3>{post.user.full_name}</h3>
      <img src={post.user_avatar} style={style} alt="user avatar" />
      <h4>{post.content}</h4>
    {isCommentClicked ?
      <div>{post.comments_data.map( data => <CommentCard key={data.comment.id} data={data} />)}</div> :
      <div>
        {post.comments_data[0]? <CommentCard data={post.comments_data[0]} /> : null}
        <button onClick={ handleCommentClick }>View more comments</button>
      </div>    
    }
    </div>
  )
}
