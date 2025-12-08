import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addMessage,
  getMessageByChatId,
  deleteMessage,
} from '../apis/messages.ts'
import { getChatById } from '../apis/chats.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useAddMessageMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ['addMessage'] })
      queryClient.invalidateQueries({ queryKey: ['chatById'] })
      queryClient.invalidateQueries({ queryKey: ['chatsById'] })
      queryClient.invalidateQueries({ queryKey: ['messageByChatId'] })
    },
  })
  return mutation
}

export function useDeleteMutation() {
  return useAddMessageMutation(deleteMessage)
}

export function useAddMessage() {
  return useAddMessageMutation(addMessage)
}

export function useGetMessageByChatId(id: number) {
  const { user, getAccessTokenSilently } = useAuth0()

  const query1 = useQuery({
    queryKey: ['chatById'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getChatById(token, id)
    },
    enabled: !!user,
  })

  const query2 = useQuery({
    queryKey: ['messageByChatId'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getMessageByChatId({ token, id })
    },
    enabled: !!user,
  })

  return {
    chatById: query1,
    messageByChatId: query2,
  }
}
