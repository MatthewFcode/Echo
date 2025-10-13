import { useQuery } from '@tanstack/react-query'
import {
  financeNews,
  softwareDevNews,
  newsFromNewZealand,
} from '../apis/news.ts'

export function useFinanceNews() {
  const result = useQuery({
    queryKey: ['financeNews'],
    queryFn: financeNews,
    refetchOnWindowFocus: true,
  })
  return result
}

export function useSoftwareDevNews() {
  const result = useQuery({
    queryKey: ['devNews'],
    queryFn: softwareDevNews,
    refetchOnWindowFocus: true,
  })
  return result
}

export function useNewZealandNews() {
  const result = useQuery({
    queryKey: ['nz-news'],
    queryFn: newsFromNewZealand,
    refetchOnWindowFocus: true,
  })
  return result
}
