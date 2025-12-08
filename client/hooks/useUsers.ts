import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { getMe, getUserById, addUser, getAllUsers } from '../apis/users'
import { useAuth0 } from '@auth0/auth0-react'

export function useUsers() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getMe({ token })
    },
    enabled: !!user,
  })
  return {
    ...query,
    add: useAddUser(),
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['addUser'] })
      queryClient.invalidateQueries({ queryKey: ['all-users'] })
      queryClient.invalidateQueries({ queryKey: ['userById'] })
    },
  })

  return mutation
}

export function useAddUser() {
  return useUserMutation(addUser)
}

export function useUserById(id: number) {
  const { user, getAccessTokenSilently } = useAuth0()

  return useQuery({
    queryKey: ['userById'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getUserById(token, id)
    },
    enabled: !!user && !!id,
  })
}

export function useAllUsers() {
  const { getAccessTokenSilently, user } = useAuth0()

  return useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getAllUsers({ token })
    },
    enabled: !!user,
  })
}
