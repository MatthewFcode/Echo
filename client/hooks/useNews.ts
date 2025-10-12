import { useQuery } from '@tanstack/react-query'
import { financeNews, softwareDevNews } from '../apis/news.ts'

export function useFinanceNews() {
  const result = useQuery({
    queryKey: ['financeNews'],
    queryFn: financeNews,
    refetchInterval: 24 * 60 * 60 * 1000,
  })
  return result
}

export function useSoftwareDevNews() {
  const result = useQuery({
    queryKey: ['devNews'],
    queryFn: softwareDevNews,
    refetchInterval: 24 * 60 * 60 * 1000,
  })
  return result
}
