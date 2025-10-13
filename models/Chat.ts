export interface ChatData {
  userId: number
  userId2: number
}

export interface Chat extends ChatData {
  id: number
  user_id: number
  user_id2: number
}

export interface BothUsers {
  id: number
  u1Id: number
  u1UserName: string
  u1Auth0Id: string
  u1ProfilePic: string
  u2Id: number
  u2UserName: string
  u2Auth0Id: string
  u2ProfilePic: string
}
