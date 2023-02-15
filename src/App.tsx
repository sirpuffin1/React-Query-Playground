import './App.css'

function App() {
  return (
    <div className="App">
      <h1>React Query</h1>
    </div>
  )
}

// function to simulate load times
function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
