// import { useFinanceNews, useSoftwareDevNews } from '../hooks/useNews.ts'
// import LoadingSpinner from './LoadingSpinner.tsx'
// import { Finance } from '../../models/News.ts'

// function NewsRotator() {
//   const {
//     data: financeNews,
//     isPending: isFinancePending,
//     isError: isFinanceError,
//   } = useFinanceNews()
//   const {
//     data: softwareDevNews,
//     isPending: isSoftwareDevPending,
//     isError: isSoftwareDevError,
//   } = useSoftwareDevNews()

//   if (isFinancePending || isSoftwareDevPending) {
//     return <LoadingSpinner />
//   }

//   if (isFinanceError || isSoftwareDevError) {
//     return null // Don't show error in ticker
//   }

//   const combinedNews = [...(financeNews || []), ...(softwareDevNews || [])]

//   // Duplicate the news array to create seamless loop
//   const duplicatedNews = [...combinedNews, ...combinedNews]

//   return (
//     <div className="news-ticker-container">
//       <div className="news-ticker">
//         {duplicatedNews.map((news: Finance, index) => (
//           <span key={index}>
//             <a
//               href={news.url}
//               target="_blank"
//               rel="noreferrer"
//               className="news-item"
//             >
//               {news.title}
//             </a>
//             <span className="news-separator">•</span>
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default NewsRotator

import { useFinanceNews, useSoftwareDevNews } from '../hooks/useNews.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { Finance } from '../../models/News.ts'

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

  if (isFinancePending || isSoftwareDevPending) {
    return <LoadingSpinner />
  }

  if (isFinanceError || isSoftwareDevError) {
    return null
  }

  const combinedNews = [...(financeNews || []), ...(softwareDevNews || [])]

  // Duplicate the news array to create seamless loop
  const duplicatedNews = [...combinedNews, ...combinedNews]

  return (
    <div className="news-ticker-container">
      <div className="news-ticker">
        {duplicatedNews.map((news: Finance, index) => (
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
