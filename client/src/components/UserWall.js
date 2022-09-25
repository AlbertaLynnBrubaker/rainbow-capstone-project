import { useContext, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "react-router-dom"
import { UserContext } from "../tools/hooks"
import { PostCard } from "./PostCard"

let page = 0

export const UserWall = () => {
  const { user } = useContext(UserContext)
  const [ errors, setErrors ] = useState([])
  const [posts, setPosts] = useState([])
  const [postLength, setPostLength] = useState(10)
  const [bannerName, setBannerName] = useState("")
  const [hasMore, setHasMore] = useState(true)
  

  const params = useParams()

  useEffect(() => {
    fetch(`/${params.username}?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            console.log(data.posts)
            setPosts(data.posts)
            setPostLength(data.length)
            setBannerName(data.posts[0].user.full_name.split(' ')[0])   
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
      fetch(`/${params.username}?page=${page}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {            
            setPosts(posts => posts.concat(data.posts))            
          })        
        }
      })      
    }, 500)
  }


  const handlePostSubmit = (e) => {
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
    
    fetch('/posts', {
      method: 'POST',
      body: data
    })
      .then(r => { 
      if(r.ok) {
        r.json().then(post => {          
          setPosts(posts => [post, ...posts])
        })
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  const handleDeletePost = (post_id) => {
    fetch(`/posts/${post_id}`, {
      method: 'DELETE'
    })
      .then(() => {
        if(page >= 0) {
          page = page - 1
        } else {
          page = 0
        }
        setPosts(posts => posts.filter(p => post_id === !p.id))
      })
  }

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return(
    <>
      <h1>{`${bannerName}'s Agenda`}</h1>
      {user ? <form onSubmit={handlePostSubmit}>        
        <textarea type="text" name="content" placeholder='Make a new post...' />
        <br/>          
        <input type="file" name="image" />
        <br/>
        <button type="submit">Make Post</button>
      </form> : null}
      <InfiniteScroll dataLength={posts.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <button onClick={topFunction}>Back to top</button>
      }>{posts.map(post => {
        
        return (
        <>            
          <PostCard key={post.id} post= {post} posts={posts} setPosts={setPosts} handleDeletePost={handleDeletePost} />
        </>
        )}
      )}</InfiniteScroll>        
    </>
  )
}