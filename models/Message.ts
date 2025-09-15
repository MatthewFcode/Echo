export interface MessageData {
  id: number
  chatId: number
  message?: string
  image?: string
  userId: number
  timeStamp: string
  file?: undefined
}

export interface Message extends MessageData {
  id: number
}