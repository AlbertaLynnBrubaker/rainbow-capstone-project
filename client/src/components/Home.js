import { useContext, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserContext } from "../tools/hooks"
import { PostCard } from "./PostCard"

// Testing purposes
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
}

let page = 0

export const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetch(`/posts?page=0`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setPosts(data)            
          })        
        }
      })
  }, [])

  const fetchMore = () => {
    if (posts.length > 450) {
      return setHasMore(false)
    }
    setTimeout(() => {     
      page = page + 1 
      fetch(`/posts?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            console.log(data)
            setPosts(posts => posts.concat(data))            
          })        
        }
      })      
    }, 500)
  }

  console.log(posts)

  if(user) {
    return(
      <>
        <h1>Home</h1>
        <InfiniteScroll dataLength={posts.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>{posts.map(post => (
          <PostCard key={post.id} post= {post} />
        ))}</InfiniteScroll>        
      </>
    )
  }
}