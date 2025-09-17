import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Registration from './components/Registration.tsx'
import Layout from './components/Layout.tsx'
import { Chat } from './components/Chat.tsx'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />
      <Route path="chat/:id" element={<Chat />} />
    </Route>
    ,
    <Route path="register" element={<Registration />} />,
  </>,
)
