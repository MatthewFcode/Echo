import { ChangeEvent, FormEvent, useState } from 'react'
import useAddMessage from '../hooks/useMessages'
import { MessageData } from '../../models/Message'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@radix-ui/themes'

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
  const addMessage = useAddMessage()

  const { getAccessTokenSilently } = useAuth0()

  const [formState, setFormState] = useState(empty)

  if (addMessage.isPending) {
    return <p>Loading...</p>
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setFormState({ ...formState, file: e.target.files[0] })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget

    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = await getAccessTokenSilently()

    const newMessage = new FormData()

    newMessage.append('message', String(formState.message))
    newMessage.append('timeStamp', new Date().toISOString())

    if (formState.file) newMessage.append('uploaded_file', formState.file)
    else newMessage.append('image', formState.image)

    addMessage.mutateAsync({ newMessage, token })
    setFormState(empty)
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
            />
            <Button className='message-send-button' type="submit" color="gray" variant="outline" highContrast>
              Send
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
