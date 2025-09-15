import { Theme } from '@radix-ui/themes'
import Message from './Message'
import Nav from './Nav'
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold">
          <img src='' alt=''/>
          Whats UP
        </h1>
        <Theme>
        <Nav />
        <Message />
        </Theme>
      </div>
    </>
  )
}

export default App
