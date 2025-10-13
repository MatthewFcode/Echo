import {
  useDeleteMutation,
  useGetMessageByChatId,
} from '../hooks/useMessages.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams, useNavigate } from 'react-router'
import Message from './Message.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useUsers } from '../hooks/useUsers.ts'

function Chat() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/ws')

    ws.onopen = () => {
      console.log('websocket connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'database_change') {
        queryClient.invalidateQueries({ queryKey: ['chatsById'] })
        queryClient.invalidateQueries({ queryKey: ['chats'] })
      }
    }

    ws.onclose = () => {
      console.log('Websocket closed')
    }

    ws.onerror = (error) => {
      console.log(error)
    }
  }, [queryClient])

  const { id } = useParams<{ id: string }>()
  const chatId = Number(id)
  const { chatById, messageByChatId } = useGetMessageByChatId(chatId)
  const deleteMessage = useDeleteMutation()
  const { getAccessTokenSilently } = useAuth0()

  const navigate = useNavigate()

  const {
    data: currentUser,
    isPending: isUserPending,
    isError: isUserError,
  } = useUsers()

  useEffect(() => {
    // Wait until we have both the chat data and current user data
    if (chatById.data && currentUser) {
      // Check if current user is either user1 or user2 in this chat
      const isAuthorized =
        chatById.data.u1Id === currentUser.id ||
        chatById.data.u2Id === currentUser.id

      // If user is NOT authorized (not part of this chat), kick them out
      if (!isAuthorized) {
        console.log('Unauthorized access attempt to chat', chatId)
        navigate('/') // Send them back to home
      }
    }
  }, [chatById.data, currentUser, navigate, chatId])

  const handleDelete = async (id: number) => {
    try {
      const token = await getAccessTokenSilently()

      await deleteMessage.mutateAsync({ token, id })
    } catch (error) {
      console.log(error)
    }
  }

  const messageByChatIdData = messageByChatId.data

  if (chatById.isLoading || messageByChatId.isLoading || isUserPending) {
    return <div>Loading...</div>
  }

  if (chatById.isError || messageByChatId.isError || isUserError) {
    return <div>Error loading data.</div>
  }

  return (
    <div className="chat-page">
      <div className="chat-messages">
        <h2>Messages</h2>
        {messageByChatIdData?.map((message) => (
          <div className="message-item" key={message.timeStamp}>
            <img
              className="message-avatar"
              src={message.userProfilePic}
              alt="user profile pic"
            />
            <p className="message-meta">
              {message.usersUserName} - {message.timeStamp}
            </p>
            <p className="message-content">{message.message}</p>
            {message.image && message.image?.length >= 1 && (
              <img
                className="message-image"
                alt="message-image"
                src={message.image}
              />
            )}
            <button
              className="message-delete"
              onClick={() => handleDelete(message.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <Message />
    </div>
  )
}

export default Chat
