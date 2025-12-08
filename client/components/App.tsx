import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import Typing from './Typing'
// import { useEffect } from 'react'
// import { useQueryClient } from '@tanstack/react-query'

function App() {
  // const queryClient = useQueryClient()
  // useEffect(() => {
  //   const ws = new WebSocket('wss://echo.borb.nz/')
  //   ws.onopen = () => {
  //     console.log('Websocket connected')
  //   }

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //     if (data.type == 'database_change') {
  //       queryClient.invalidateQueries({ queryKey: ['all-users'] })
  //       queryClient.invalidateQueries({ queryKey: ['userById'] })
  //       queryClient.invalidateQueries({ queryKey: ['chatsById'] })
  //       queryClient.invalidateQueries({ queryKey: ['chats'] })
  //       queryClient.invalidateQueries({ queryKey: ['chatById'] })
  //       //queryClient.invalidateQueries({ queryKey: [''] })
  //     }
  //     ws.onclose = () => {
  //       console.log('WebSocket closed')
  //     }
  //     ws.onerror = (error) => {
  //       console.log('WebSocket error', error)
  //     }
  //     return () => ws.close()
  //   }
  // }, [queryClient])
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
