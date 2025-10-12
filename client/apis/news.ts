import request from 'superagent'
import { Finance } from '../../models/News.ts'
// fetching the different news apis

export async function financeNews() {
  const result = await request.get(
    'https://api.gdeltproject.org/api/v2/doc/doc?query=finance&querylang=english&mode=ArtList&format=json&maxrecords=20&timespan=1d',
  )

  const englishArticles = result.body.articles.filter(
    (article: Finance) => article.language === 'English',
  )
  return englishArticles
}

export async function softwareDevNews() {
  const result = await request.get(
    'https://api.gdeltproject.org/api/v2/doc/doc?query=software%20development&querylang=english&mode=ArtList&format=json&maxrecords=20&timespan=1d',
  )
  const englishArticles = result.body.articles.filter(
    (article: Finance) => article.language === 'English',
  )

  return englishArticles
}
