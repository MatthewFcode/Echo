import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUsers, useAllUsers } from '../hooks/useUsers.ts'
import { useCreateChat } from '../hooks/useChats.ts'
import { useQueryClient } from '@tanstack/react-query'

function Search() {
  const [search, setSearch] = useState('')

  const addChat = useCreateChat()

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  useEffect(() => {
    const ws = new WebSocket('wss://echo.borb.nz/')
    ws.onopen = () => {
      console.log('Websocket connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type == 'database_change') {
        queryClient.invalidateQueries({ queryKey: ['all-users'] })
        queryClient.invalidateQueries({ queryKey: ['userById'] })
        queryClient.invalidateQueries({ queryKey: ['chatsById'] })
        queryClient.invalidateQueries({ queryKey: ['chats'] })
        queryClient.invalidateQueries({ queryKey: ['chatById'] })
        //queryClient.invalidateQueries({ queryKey: [''] })
      }
      ws.onclose = () => {
        console.log('WebSocket closed')
      }
      ws.onerror = (error) => {
        console.log('WebSocket error', error)
      }
      return () => ws.close()
    }
  }, [queryClient])

  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
  } = useUsers()

  const {
    data: allUsers,
    isLoading: isLoadingAllUsers,
    isError: isAllUserError,
  } = useAllUsers()

  if (isCurrentUserLoading || isLoadingAllUsers) {
    return <div>...Loading</div>
  }

  if (isCurrentUserError || isAllUserError) {
    return <div>...Error loading users</div>
  }

  const currentUserId = currentUser?.id

  interface User {
    id: number
    user_name: string
    profile_pic: string
  }

  const filteredUsers: User[] =
    allUsers
      ?.filter((u: User) =>
        u.user_name?.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((u: User) => u.id !== currentUserId) || []

  const handleStartChat = async (userId2: number) => {
    try {
      if (currentUserId !== undefined) {
        const response = await addChat.mutateAsync({
          userId: currentUserId,
          userId2,
        })
        const chatId = response[0]
        navigate(`/chat/${chatId}`)
        setSearch('')
      }
    } catch (err) {
      console.log('Error creating the chat', err)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Users..."
        aria-label="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search !== '' && (
        <ul>
          {filteredUsers.map((u) => (
            <li key={u.id}>
              <button
                onClick={() => handleStartChat(u.id)}
                aria-label={`Chat with ${u.user_name}`}
              >
                <img src={u.profile_pic} alt={u.user_name} />
                Chat with {u.user_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
