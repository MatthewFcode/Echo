import { Avatar, Box, Button, Card, Flex, Text } from '@radix-ui/themes'
import { useChats } from '../hooks/useChats.ts'
import { useUsers } from '../hooks/useUsers.ts'
import { IfAuthenticated, IfNotAuthenticated } from './Authorization.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
import Search from './Search.tsx'

function Nav() {
  const { logout, loginWithRedirect, user } = useAuth0()
  const {
    data: userData,
    isPending: isPendingUser,
    isError: isErrorUser,
  } = useUsers()
  const userId = userData?.id
  const { data, isPending, isError } = useChats(userId as number)
  const navigate = useNavigate()

  if (data !== undefined && isPending) {
    return <p>Loading...</p>
  }
  if (data !== undefined && isError) {
    return <p>There was an error</p>
  }

  if (userData !== undefined && isPendingUser) {
    return <p>Loading...</p>
  }
  if (userData !== undefined && isErrorUser) {
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

  const handleChatClick = (id: number) => {
    navigate(`/chat/${id}`)
    console.log('Box clicked!')
  }

  return (
    <>
      <div className="nav-container">
        <nav>
          <IfAuthenticated>
            <div className="sign-out-button">
              <Button onClick={handleSignOut} radius="full" variant="soft">
                Sign out
              </Button>
            </div>
            <div className="signed-in-info">
              {user && (
                <Box width="9.5vw" maxWidth="10vw">
                  <Card>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="4"
                        src={userData?.profile_pic || user?.picture}
                        radius="full"
                        fallback={userData?.user_name?.[0] || 'U'}
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          {userData?.user_name || user?.name}
                        </Text>
                        <Text as="div" size="2" color="gray">
                          {user?.nickname}
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Box>
              )}
            </div>
            <Search />
            <div className="nav-chats">
              <h1 className="nav-title">Chats: </h1>
              <div>
                {data !== undefined ? (
                  data.map((chat) => {
                    return (
                      <div className="current-chats" key={chat.id}>
                        {chat.u2Id == userId ? (
                          <>
                            <Box width="9.5vw" maxWidth="10vw">
                              <Card size="1">
                                <Flex gap="3" align="center">
                                  <Avatar
                                    size="4"
                                    radius="full"
                                    src={chat.u2ProfilePic}
                                    color="indigo"
                                    fallback="Avatar"
                                  />
                                  <Box>
                                    <Text as="div" size="2" weight="bold">
                                      {chat.u2UserName}
                                    </Text>

                                    <Text as="div" size="2" color="gray">
                                      Chat Id: {chat.id}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Card>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box
                              width="9.5vw"
                              maxWidth="10vw"
                              onClick={() => handleChatClick(chat.id)}
                            >
                              <Card size="1">
                                <Flex gap="3" align="center">
                                  <Avatar
                                    size="4"
                                    radius="full"
                                    src={chat.u1ProfilePic}
                                    color="indigo"
                                    fallback="Avatar"
                                  />
                                  <Box>
                                    <Text as="div" size="2" weight="bold">
                                      {chat.u2UserName}
                                    </Text>
                                    <Text as="div" size="2" color="gray">
                                      Chat Id: {chat.id}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Card>
                            </Box>
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
            <Flex gap="3" align="center">
              <Button onClick={handleSignIn} radius="full" variant="soft">
                Sign in
              </Button>
              <Box>
                <Text as="div" size="2" weight="bold">
                  Please Sign in to Access Chats...
                </Text>
              </Box>
            </Flex>
          </IfNotAuthenticated>
        </nav>
      </div>
    </>
  )
}

export default Nav
