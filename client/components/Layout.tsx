import { Outlet } from 'react-router'
import { Theme } from '@radix-ui/themes'
import Nav from './Nav'
import NewsRotator from './News.tsx'

export default function Layout() {
  return (
    <>
      <header>
        <img src="/images/init.png" alt="Echo" />

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
