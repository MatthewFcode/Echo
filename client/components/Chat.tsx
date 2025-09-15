// import { useState } from 'react'
import { Callout, Flex, Text } from '@radix-ui/themes'
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

  const chatByIdData = chatById.data
  const messageByChatIdData = messageByChatId.data

  return (
    <>
      <div className='messages'>
        <h1>Messages</h1>
        {messageByChatIdData?.map((message) => {
          return (
            <div key={message.timeStamp}>
              <Callout.Root>
                <Text
                  as="div"
                  size="2"
                  style={{ padding: 'none', margin: 'none', gap: '1vh' }}
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
