import { MutationFunction } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addMessage } from '../apis/messages.ts'

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
