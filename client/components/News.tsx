import {
  useFinanceNews,
  useSoftwareDevNews,
  useNewZealandNews,
} from '../hooks/useNews.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { News } from '../../models/News.ts'

function NewsRotator() {
  const {
    data: financeNews,
    isPending: isFinancePending,
    isError: isFinanceError,
  } = useFinanceNews()
  const {
    data: softwareDevNews,
    isPending: isSoftwareDevPending,
    isError: isSoftwareDevError,
  } = useSoftwareDevNews()

  const {
    data: newsNewZealand,
    isPending: isNzPending,
    isError: isNzError,
  } = useNewZealandNews()

  if (isFinancePending || isSoftwareDevPending || isNzPending) {
    return <LoadingSpinner />
  }

  if (isFinanceError || isSoftwareDevError || isNzError) {
    return <div>...Error displaying news</div>
  }

  const combinedNews = [
    ...(financeNews || []),
    ...(softwareDevNews || []),
    ...(newsNewZealand || []),
  ]

  // Duplicate the news array to create seamless loop
  const duplicatedNews = [...combinedNews, ...combinedNews, ...combinedNews]

  return (
    <div className="news-ticker-container">
      <div className="news-ticker">
        {duplicatedNews.map((news: News, index) => (
          <span key={index}>
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="news-item"
            >
              <img src={news.socialimage} alt="" className="news-item-image" />
              <span className="news-item-title">{news.title}</span>
            </a>
            <span className="news-separator">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default NewsRotator
