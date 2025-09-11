import { useAuth0 } from '@auth0/auth0-react'

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  screen_hint: 'signup',
                },
              })
            }
          >
            Register 
          </button>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome, {user?.name}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </>
      )}
    </div>
  )
}
