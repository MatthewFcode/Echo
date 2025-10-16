import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import Typing from './Typing'

function App() {
  return (
    <>
      <div className="app">
        <Theme></Theme>
        <Typing />
      </div>
    </>
  )
}

export default App
