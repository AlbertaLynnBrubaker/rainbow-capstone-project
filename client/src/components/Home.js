import { useContext, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserContext } from "../tools/hooks"

// Testing purposes
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
}

export const Home = () => {
  const { user, setUser } = useContext(UserContext)
  // Testing purposes
  const [test, setTest] = useState({
    items: Array.from({ length: 30 })
  })
  const [hasMore, setHasMore] = useState(true)

  const fetchMore = () => {
    if (test.items.length > 450) {
      return setHasMore(false)
    }
    setTimeout(() => {
      setTest({
        items: test.items.concat(Array.from({ length: 20 }))
      });
    }, 500)
  }

  if(user) {
    return(
      <>
        <h1>Home</h1>
        <InfiniteScroll dataLength={test.items.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>{test.items.map((i, index) => (
          <div key={index}>
            Test - #{index}
          </div>
        ))}</InfiniteScroll>        
      </>
    )
  }
}