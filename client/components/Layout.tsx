import { Outlet, useLocation, Link } from 'react-router'
import { Theme } from '@radix-ui/themes'
import Nav from './Nav'
import NewsRotator from './News.tsx'
import { useEffect, useState } from 'react'
import WelcomeOverlay from './WelcomeOverlay.tsx'

export default function Layout() {
  const [showOverlay, setShowOverlay] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
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
