import { useChats } from '../hooks/useChats.ts'
import { useUsers } from '../hooks/useUsers.ts'
import { IfAuthenticated, IfNotAuthenticated } from './Authorization.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const { logout, loginWithRedirect, user } = useAuth0()
  const { data: userData } = useUsers()
  const userId = userData?.id
  const { data, isPending, isError } = useChats(userId as number)

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/register`,
      },
    })
  }

  if (data !== undefined && isPending) {
    return <p>Loading...</p>
  }
  if (data !== undefined && isError) {
    return <p>There was an error</p>
  }

  return (
    <>
      <nav>
        <IfAuthenticated>
          <button onClick={handleSignOut}>Sign out</button>
          {user && <p>Signed in as: {user?.nickname}</p>}
          {userData?.userName && <p>Username: {userData.userName}</p>}
          <div>
          <h1>Chats: </h1>
          <p>
            {data !== undefined ? data.map((chat) => {
              return (
                <div key={chat.id}>
                  <p>Chat Id: {chat.id}</p>
                </div>
              )
            }) : <p></p>}
          </p>
        </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleSignIn}>Sign in</button>
        </IfNotAuthenticated>
      </nav>
    </>
  )
}

export default Nav
