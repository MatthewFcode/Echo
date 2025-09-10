import { useQuery } from "@tanstack/react-query"
import { getChats, getChatById } from "../apis/chats"
import { useAuth0 } from "@auth0/auth0-react"

export async function useChats() {
  const { user, getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      getChats(token)
    },
    enabled: !!user,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })
  return {
    ...query
  }
}

export async function useChatById(id: number) {
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
  })
  return {
    ...query
  }
}