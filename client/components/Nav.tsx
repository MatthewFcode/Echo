import { useChats } from '../hooks/useChats.ts'
import { useUsers } from '../hooks/useUsers.ts'
import { IfAuthenticated, IfNotAuthenticated } from './Authorization.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { logout, loginWithRedirect, user } = useAuth0()
  const { data: userData } = useUsers()
  const userId = userData?.id
  const { data, isPending, isError } = useChats(userId as number)

  if (data !== undefined && isPending) {
    return <p>Loading...</p>
  }
  if (data !== undefined && isError) {
    return <p>There was an error</p>
  }


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

  return (
    <>
      <nav>
        <IfAuthenticated>
          <button onClick={handleSignOut}>Sign out</button>
          {user && <p>Signed in as: {user?.nickname}</p>}
          {userData?.userName && <p>Username: {userData.userName}</p>}
          <div>
            <h1>Chats: </h1>
            <div>
              {data !== undefined ? (
                data.map((chat) => {
                  return (
                    <div key={chat.id}>
                      <p>Chat Id: {chat.id}</p> 
                      {/* Important Tereny to access both users - leave this comment here */}
                      {chat.u2Id == userId ? (
                        <>
                          <p>Other User: {chat.u1UserName}</p>
                          <img
                            alt="imgage-of-other-user"
                            src={chat.u1ProfilePic}
                          ></img>
                        </>
                      ) : (
                        <>
                          <p>Other User: {chat.u2UserName}</p>
                          <img
                            alt="imgage-of-other-user"
                            src={chat.u2ProfilePic}
                          ></img>
                        </>
                      )}
                    </div>
                  )
                })
              ) : (
                <p></p>
              )}
            </div>
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
