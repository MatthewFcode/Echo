// import { useState } from 'react'
import { Callout, Text } from '@radix-ui/themes'
import { useGetMessageByChatId } from '../hooks/useMessages.ts'
import { useParams } from 'react-router'
import Message from './Message.tsx'

export function Chat() {
  const { id } = useParams<{ id: string }>()
  const chatId = Number(id)
  const { chatById, messageByChatId } = useGetMessageByChatId(chatId)
  // const { chatById, messageByChatId } = useGetMessageByChatId(2)

  if (chatById.isLoading || messageByChatId.isLoading) {
    return <div>Loading...</div>
  }

  if (chatById.isError || messageByChatId.isError) {
    return <div>Error loading data.</div>
  }

  // console.log(chatById.data)
  // console.log(messageByChatId.data)

  // const chatByIdData = chatById.data
  const messageByChatIdData = messageByChatId.data

  return (
    <>
    <Message />
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
                {message.image != undefined ? <img style={{width: '10vw', paddingTop: '1vh'}} alt='message-image' src={message.image}></img> : <p></p>}
              </Callout.Root>
              <br></br>
            </div>
          )
        })}
      </div>
    </>
  )
}
