import React from 'react'

//temp image styling
const style = {
  height: 40,
  width: 'auto',
  border: "1px solid black",
  borderRadius: 40,
  margin: 6
}

export const CommentCard = ({data}) => {
  console.log(data)
  return (
    <div>
      <h4>{data.user.full_name}</h4>
      <img src= {data.user_avatar} alt="user avatar" style={style}/>
      <h5>{data.comment.content}</h5>
    </div>
  )
}
