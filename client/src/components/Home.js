import { useContext, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { NavButton, UserContext } from "../tools/hooks"
import { PostCard } from "./PostCard"

let page = 0

export const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [postLength, setPostLength] = useState(10)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetch(`/posts?page=0`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            console.log(data.posts, data.length)
            setPosts(data.posts)
            setPostLength(data.length)     
          })        
        }
      })
  }, [])

  const fetchMore = () => {
    if (posts.length >= postLength) {
      return setHasMore(false)
    }
    setTimeout(() => {     
      page = page + 1 
      fetch(`/posts?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {            
            setPosts(posts => posts.concat(data.posts))            
          })        
        }
      })      
    }, 500)
  }


  const handlePostSubmit = () => {

  }

  // const handleSignupSubmit = (e) => {
  //   e.preventDefault()
  //   const data = new FormData()

  //   data.append('user[username]', e.target.username.value)
  //   data.append('user[email]', e.target.email.value)
  //   data.append('user[password]', e.target.password.value)
  //   data.append('user[password_confirmation]', e.target.password_confirmation.value)
  //   data.append('user[avatar]', e.target.avatar.files[0])
  //   console.log(data)
  //   submitToAPI(data)
  // }

  if(user) {
    return(
      <>
        <h1>Home</h1>
        <form onSubmit={handlePostSubmit}>        
          <textarea type="text" name="content" placeholder='Make a new post...' />
          <br/>
          <button type="submit">Make Post</button>
        </form>
        <InfiniteScroll dataLength={posts.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <NavButton path="/" text="Back to top" />
        }>{posts.map(post => (
          <PostCard key={post.id} post= {post} />
        ))}</InfiniteScroll>        
      </>
    )
  }
}