import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header>
        <img src='./public/images/rect4.webp' alt=''/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
