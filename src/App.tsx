import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
interface IPost {
  id: number | string;
  title: string;
}
const POSTS: IPost[] = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function App() {
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title: title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  });

  const { data, isLoading, isError, error } = postsQuery;

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;

  return (
    <div>
      {data.map((post) => (
        <>
          <h1>{post.id}</h1>
          <p>{post.title}</p>
        </>
      ))}
   
      <button 
      disabled={newPostMutation.isLoading}
      onClick={() => newPostMutation.mutate("New post")}>Click me</button>
    </div>
  );
}

// function to simulate load times
function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
