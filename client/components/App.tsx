import { Theme } from '@radix-ui/themes'
//import Message from './Message'
import Nav from './Nav'
import '@radix-ui/themes/styles.css'
import { Chat } from './Chat'
import Message from './Message'

function App() {
  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold"></h1>
        <Theme></Theme>
      </div>
    </>
  )
}

export default App
