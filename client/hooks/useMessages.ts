import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addMessage, getMessageByChatId } from '../apis/messages.ts'
import { getChatById } from '../apis/chats.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useAddMessageMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addMessage'] })
    },
  })

  return mutation
}

export default function useAddMessage() {
  return useAddMessageMutation(addMessage)
}

export function useGetMessageByChatId(id: number) {
  const { user, getAccessTokenSilently } = useAuth0()

  const query1 = useQuery({
    queryKey: ['chatById', id],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      getChatById(token, id)
    },
    enabled: !!user,
  })

  const query2 = useQuery({
    queryKey: ['messageByChatId', id],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      getMessageByChatId({ token, id })
    },
    enabled: !!user,
  })

  return {
    chatById: query1,
    messAgeByChatId: query2,
  }
}
