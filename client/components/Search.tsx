import { useState } from 'react'
//import { useAuth0 } from '@auth0/auth0-react'
import { useUsers } from '../hooks/useUsers.ts'
import { useCreateChat } from '../hooks/useChats.ts'

function Search() {
  const [search, setSearch] = useState('')
  //const { user, getAccessTokenSilently } = useAuth0()
  const addChat = useCreateChat()

  const { data: allUsers, isLoading, isError } = useUsers()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    return <div>...Error loading users</div>
  }

  const userId = allUsers?.id

  const filteredUsers = allUsers
    .filter((u) => u.userName.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => u.id !== userId)

  const handleStartChat = (userId2: number) => {
    addChat.mutateAsync({ userId, userId2 })
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredUsers?.map((u) => (
          <li key={u.id}>
            {u.userName}
            <button onClick={() => handleStartChat(u.id)}></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
