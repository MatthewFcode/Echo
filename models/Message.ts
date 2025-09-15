export interface MessageData {
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