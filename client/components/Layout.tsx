import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header>
        <img src='/images/rect4.webp' alt='whats-up-logo'/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
