import { Outlet, useLocation, Link } from 'react-router'
import { Theme } from '@radix-ui/themes'
import Nav from './Nav'
import NewsRotator from './News.tsx'
import { useEffect, useState } from 'react'
import WelcomeOverlay from './WelcomeOverlay.tsx'
import { useQueryClient } from '@tanstack/react-query'

export default function Layout() {
  const [showOverlay, setShowOverlay] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const queryClient = useQueryClient()
  useEffect(() => {
    const ws = new WebSocket('wss://echo.borb.nz/')
    ws.onopen = () => {
      console.log('Websocket connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type == 'database_change') {
        queryClient.invalidateQueries({ queryKey: ['all-users'] })
        queryClient.invalidateQueries({ queryKey: ['userById'] })
        queryClient.invalidateQueries({ queryKey: ['chatsById'] })
        queryClient.invalidateQueries({ queryKey: ['chats'] })
        queryClient.invalidateQueries({ queryKey: ['chatById'] })
        queryClient.invalidateQueries({ queryKey: ['messageByChatId'] })
      }
      ws.onclose = () => {
        console.log('WebSocket closed')
      }
      ws.onerror = (error) => {
        console.log('WebSocket error', error)
      }
      return () => ws.close()
    }
  }, [queryClient])
  useEffect(() => {
    if (isHomePage && !sessionStorage.getItem('hasVisited')) {
      setShowOverlay(true)
    }
  }, [isHomePage])

  const handleOverlayClose = () => {
    setShowOverlay(false)
    sessionStorage.setItem('hasVisited', 'true')
  }
  return (
    <>
      {showOverlay && <WelcomeOverlay onClose={handleOverlayClose} />}
      <header>
        <Link to="/">
          <img src="/images/init.png" alt="Echo" />
        </Link>

        <NewsRotator />
      </header>

      <main>
        <Theme>
          <Nav />

          <Outlet />
        </Theme>
      </main>
      <footer></footer>
    </>
  )
}
