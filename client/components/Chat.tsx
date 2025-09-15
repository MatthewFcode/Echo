// import { useState } from 'react'
import { Callout, Text, Button } from '@radix-ui/themes'
import { useGetMessageByChatId } from '../hooks/useMessages.ts'

export function Chat() {
  // const { chatId } = useParams<{ chatId: string }>()
  // const id = Number(chatId)
  const { chatById, messageByChatId } = useGetMessageByChatId(1, 1)
  // const { chatById, messageByChatId } = useGetMessageByChatId(2)

  if (chatById.isLoading || messageByChatId.isLoading) {
    return <div>Loading...</div>
  }

  if (chatById.isError || messageByChatId.isError) {
    return <div>Error loading data.</div>
  }

  console.log(chatById)
  console.log(messageByChatId)

  // const chatByIdData = chatById.data
  const messageByChatIdData = messageByChatId.data

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
              </Callout.Root>
              <br></br>
            </div>
          )
        })}
      </div>
    </>
  )
}
