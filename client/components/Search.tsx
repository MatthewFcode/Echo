import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useUsers, useAllUsers } from '../hooks/useUsers.ts'
import { useCreateChat } from '../hooks/useChats.ts'

function Search() {
  const [search, setSearch] = useState('')

  const addChat = useCreateChat()

  const navigate = useNavigate()

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
        const chatId = response?.chatId
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
