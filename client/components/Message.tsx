import { ChangeEvent, FormEvent, useState } from 'react'
import { useAddMessage } from '../hooks/useMessages'
import { MessageData } from '../../models/Message'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@radix-ui/themes'
import { Navigate, useParams } from 'react-router'
import { useUsers } from '../hooks/useUsers'
import { useNavigate } from 'react-router'

const empty = {
  id: '',
  chatId: '',
  message: '',
  image: '',
  userId: '',
  timeStamp: '',
  file: undefined,
} as unknown as MessageData

export default function Message() {
  const { id } = useParams<{ id: string }>()
  const chatIdd = Number(id)
  const addMessage = useAddMessage()

  const {
    data: userData,
    isPending: isPendingUser,
    isError: isErrorUser,
  } = useUsers()

  const { getAccessTokenSilently } = useAuth0()

  const [formState, setFormState] = useState(empty)

  if (addMessage.isPending) {
    return <p>Loading...</p>
  }
  if (isPendingUser) {
    return <p>Loading...</p>
  }
  if (isErrorUser) {
    return <p>There was an error with the user data</p>
  }

  const currentUser = userData?.id

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = await getAccessTokenSilently()

    if (addMessage.isPending) {
      return
    }
    const newMessage = new FormData()
    newMessage.append('message', String(formState.message))
    newMessage.append('timeStamp', new Date().toISOString())
    newMessage.append('chatId', String((formState.chatId = chatIdd)))
    newMessage.append(
      'userId',
      String((formState.userId = currentUser as number)),
    )

    if (formState.file) newMessage.append('uploaded_file', formState.file)
    else newMessage.append('image', formState.image)

    await addMessage.mutateAsync({ newMessage, token })
    setFormState(empty)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setFormState({ ...formState, file: e.target.files[0] })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget

    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div className="message-container">
        <form onSubmit={handleSubmit}>
          <div className="p-8 text-center">
            <input
              className="image-input"
              onChange={handleFileChange}
              type="file"
              id="image"
              name="file"
            />
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Message..."
              value={formState.message}
              onChange={handleChange}
              className="message-input"
              required
            />
            <Button
              data-pending={addMessage.isPending}
              className="message-send-button"
              color="gray"
              variant="outline"
              highContrast
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
