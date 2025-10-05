// import { Callout, Text, Button, Avatar } from '@radix-ui/themes'
// import {
//   useDeleteMutation,
//   useGetMessageByChatId,
// } from '../hooks/useMessages.ts'
// import { useAuth0 } from '@auth0/auth0-react'
// import { useParams } from 'react-router'
// import Message from './Message.tsx'
// import { useQueryClient } from '@tanstack/react-query'
// import { useEffect } from 'react'

// export function Chat() {
//   const queryClient = useQueryClient()

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:3000/ws')

//     ws.onopen = () => {
//       console.log('websocket connected')
//     }

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data)
//       if (data.type === 'database_change') {
//         queryClient.invalidateQueries({ queryKey: ['chatsById'] })
//         queryClient.invalidateQueries({ queryKey: ['chats'] })
//       }
//     }

//     ws.onclose = () => {
//       console.log('Websocket closed')
//     }

//     ws.onerror = (error) => {
//       console.log(error)
//     }
//   })
//   const { id } = useParams<{ id: string }>()
//   const chatId = Number(id)
//   const { chatById, messageByChatId } = useGetMessageByChatId(chatId)
//   const deleteMessage = useDeleteMutation()
//   const { getAccessTokenSilently } = useAuth0()

//   const handleDelete = async (id: number) => {
//     try {
//       const token = await getAccessTokenSilently()

//       await deleteMessage.mutateAsync({ token, id })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const messageByChatIdData = messageByChatId.data

//   if (chatById.isLoading || messageByChatId.isLoading) {
//     return <div>Loading...</div>
//   }

//   if (chatById.isError || messageByChatId.isError) {
//     return <div>Error loading data.</div>
//   }

//   return (
//     <>
//       <div
//         className="chat-container p-8 text-center"
//         style={{
//           maxWidth: '60vw',
//           transform: 'translate(25vw, -75vh)',
//           overflowY: 'visible',
//         }}
//       >
//         <h1>Messages</h1>
//         {messageByChatIdData?.map((message) => {
//           return (
//             <div className="message-wrap" key={message.timeStamp}>
//               <Avatar
//                 style={{
//                   position: 'absolute',
//                   transform: 'translate(-31.5vw, 2.4vh)',
//                   borderRadius: '1vw',
//                 }}
//                 src={message.userProfilePic}
//                 fallback="T"
//               ></Avatar>
//               <Text className="message-user-info">
//                 {message.usersUserName} - {message.timeStamp}
//               </Text>
//               <Callout.Root style={{ paddingTop: '1vh', paddingBottom: '3vh' }}>
//                 <Text as="div" size="3" className="message-text-content">
//                   {message.message}
//                 </Text>
//                 {message.image && message.image?.length >= 1 ? (
//                   <img
//                     className="message-image"
//                     style={{ width: '10vw', paddingTop: '1vh' }}
//                     alt="message-image"
//                     src={message.image}
//                   ></img>
//                 ) : (
//                   <p></p>
//                 )}
//                 <Button
//                   className="message-delete-button"
//                   style={{
//                     position: 'absolute',
//                     transform: 'translate(50vw, 1.75vh)',
//                     margin: '0px',
//                   }}
//                   onClick={() => handleDelete(message.id)}
//                 >
//                   Delete
//                 </Button>
//               </Callout.Root>
//               <br></br>
//             </div>
//           )
//         })}
//       </div>
//       <Message />
//     </>
//   )
// }
