import './App.css'
import { useQuery, useMutation } from '@tanstack/react-query'

const POSTS = [
  {id: 1, title: "Post 1"},
  {id: 2, title: "Post 2"}
]

function App() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS])
  })
  const { data, isLoading, isError, error } = postsQuery

  if(isLoading) return <h1>Loading...</h1>
  if(isError) return <pre>{JSON.stringify(error)}</pre>

  return <div>
    {data.map((post) => (
      <>
      <h1>{post.id}</h1>
      <p>{post.title}</p>
      </>
    ))}
  </div>
}

// function to simulate load times
function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
