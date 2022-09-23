import React, { useState } from 'react'
import { CommentCard } from './CommentCard'


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

export const PostCard = ({post}) => {
  const [isCommentClicked, setIsCommentClicked] = useState(false)

  const handleCommentClick = () => {
    setIsCommentClicked(!isCommentClicked)
  }

  return (
    <div>      
      <h1>{post.user.full_name}</h1>
      <img src={post.user_avatar} style={style} alt="user avatar" />
      <h4>{post.content}</h4>
      {post.image_url ? <img src={post.image_url} alt="post image" style={imageStyle} /> : null}
      <br/>
      
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
