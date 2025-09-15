// import { useState } from 'react'
import { Callout, Text, Button } from '@radix-ui/themes'
import { useDeleteMutation, useGetMessageByChatId } from '../hooks/useMessages.ts'
import { useAuth0 } from '@auth0/auth0-react'
// import { useRouter } from 'next/navigation'

export function Chat() {
  // const { chatId } = useParams<{ chatId: string }>()
  // const id = Number(chatId)
  // const router = useRouter
  const { chatById, messageByChatId } = useGetMessageByChatId(2, 2)
  const deleteMessage = useDeleteMutation()
  const { getAccessTokenSilently } = useAuth0()

  const handleDelete = async (id: number) => {
    try {
    const token = await getAccessTokenSilently()

    await deleteMessage.mutateAsync({token, id})

  } catch (error) {
    console.log(error)
    }
  }

  // const chatByIdData = chatById.data
  const messageByChatIdData = messageByChatId.data
  
  
  if (chatById.isLoading || messageByChatId.isLoading) {
    return <div>Loading...</div>
  }

  if (chatById.isError || messageByChatId.isError) {
    return <div>Error loading data.</div>
  }

  return (
    <>
      <div
        className="chat-container p-8 text-center"
        style={{ maxWidth: '60vw', transform: 'translate(25vw, -75vh)' }}
      >
        <h1>Messages</h1>
        {messageByChatIdData?.map((message) => {
          return (
            <div className="message-wrap" key={message.timeStamp}>
              <Callout.Root style={{ paddingTop: '1vh', paddingBottom: '3vh' }}>
                <Text
                  as="div"
                  size="3"
                  style={{
                    transform: 'translate(0, 2vh)',
                    height: 'fit-content',
                    padding: '0.3vw 0.4vw',
                    justifyContent: 'flex-end'
                  }}
                >
                  {message.message}
                </Text>
                {message.image && message.image?.length >= 1 ? <img style={{width: '10vw', paddingTop: '1vh'}} alt='message-image' src={message.image}></img> : <p></p>}
                <Button onClick={() => handleDelete(message.id)}>Delete</Button>
              </Callout.Root>
              <br></br>
            </div>
          )
        })}
      </div>
    </>
  )
}
