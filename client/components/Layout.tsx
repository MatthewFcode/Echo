import { Outlet } from 'react-router'
import { Theme } from '@radix-ui/themes'
import Nav from './Nav'

export default function Layout() {
  return (
    <>
      <header>
        <img src='/images/rect4.webp' alt='whats-up-logo'/>
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
