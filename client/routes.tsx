import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Registration from './components/Registration.tsx'
// export default createRoutesFromElements(<Route index element={<App />} />)

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="register" element={<Registration />} />
  </Route>,
)
