import { useQuery } from '@tanstack/react-query'
import { getChats, getChatById } from '../apis/chats'
import { useAuth0 } from '@auth0/auth0-react'

export function useChats(userId: number) {
  const { user, getAccessTokenSilently } = useAuth0()
  return useQuery({
    queryKey: ['chats', userId],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getChats(token, userId)
    },
    enabled: !!user && !!userId,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })
  
}

export function useChatById(id: number) {
  const { user, getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['chatsById'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      getChatById(token, id)
    },
    enabled: !!user,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 30000, // time in milliseconds before refetch / data refresh - 30000 is 30 seconds
  })
  return {
    ...query,
  }
}
