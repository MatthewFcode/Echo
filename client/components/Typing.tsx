// import { useState, useEffect } from 'react'

// const sentences = [
//   'The quick brown fox jumps over the lazy dog.',
//   'Never underestimate the power of a good book.',
//   'The sun always shines brightest after the rain.',
//   'Technology has revolutionized the way we live and work.',
//   'The journey of a thousand miles begins with a single step.',
// ]

// const Typing = () => {
//   const [textToType, setTextToType] = useState('')
//   const [userInput, setUserInput] = useState('')
//   const [gameStatus, setGameStatus] = useState('waiting') // waiting, in-progress, finished
//   const [startTime, setStartTime] = useState(0)
//   const [wpm, setWpm] = useState(0)
//   const [accuracy, setAccuracy] = useState(0)

//   const chooseRandomSentence = () => {
//     const randomIndex = Math.floor(Math.random() * sentences.length)
//     return sentences[randomIndex]
//   }

//   useEffect(() => {
//     if (gameStatus === 'waiting') {
//       setTextToType(chooseRandomSentence())
//     }
//   }, [gameStatus])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value

//     if (gameStatus === 'waiting') {
//       setGameStatus('in-progress')
//       setStartTime(Date.now())
//     }

//     setUserInput(inputValue)

//     if (inputValue.length === textToType.length) {
//       setGameStatus('finished')
//       const endTime = Date.now()
//       const timeInSeconds = (endTime - startTime) / 1000
//       const timeInMinutes = timeInSeconds / 60
//       const wordCount = textToType.split(' ').length
//       const calculatedWpm = Math.round(wordCount / timeInMinutes)
//       setWpm(calculatedWpm)

//       let correctChars = 0
//       for (let i = 0; i < textToType.length; i++) {
//         if (textToType[i] === inputValue[i]) {
//           correctChars++
//         }
//       }
//       const calculatedAccuracy = Math.round(
//         (correctChars / textToType.length) * 100,
//       )
//       setAccuracy(calculatedAccuracy)
//     }
//   }

//   const handlePlayAgain = () => {
//     setGameStatus('waiting')
//     setUserInput('')
//     setWpm(0)
//     setAccuracy(0)
//   }

//   const getHighlightedText = () => {
//     return textToType.split('').map((char, index) => {
//       let color = 'grey'
//       if (userInput.length > index) {
//         color = char === userInput[index] ? 'green' : 'red'
//       }
//       return (
//         <span key={index} style={{ color }}>
//           {char}
//         </span>
//       )
//     })
//   }

//   return (
//     <div className="typing-test-page">
//       <div className="typing-test-container">
//         <h2 className="typing-test-title">⌨️ Typing Speed Test ⌨️</h2>

//         <div className="typing-test-text">{getHighlightedText()}</div>

//         <input
//           type="text"
//           value={userInput}
//           onChange={handleInputChange}
//           disabled={gameStatus === 'finished'}
//           className="typing-test-input"
//           placeholder="Start typing here..."
//           autoFocus
//         />

//         {gameStatus === 'finished' && (
//           <div className="typing-test-results">
//             <h3>🎮 Results 🎮</h3>
//             <div className="results-stats">
//               <div className="stat-item">
//                 <span className="stat-label">WPM:</span>
//                 <span className="stat-value">{wpm}</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">Accuracy:</span>
//                 <span className="stat-value">{accuracy}%</span>
//               </div>
//             </div>
//             <button onClick={handlePlayAgain} className="play-again-button">
//               🔄 Play Again
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Typing
import { useState, useEffect } from 'react'

const sentences = [
  'The quick brown fox jumps over the lazy dog.',
  'Never underestimate the power of a good book.',
  'The sun always shines brightest after the rain.',
  'Technology has revolutionized the way we live and work.',
  'The journey of a thousand miles begins with a single step.',
]

const Typing = () => {
  const [textToType, setTextToType] = useState('')
  const [userInput, setUserInput] = useState('')
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, in-progress, finished
  const [startTime, setStartTime] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  const chooseRandomSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length)
    return sentences[randomIndex]
  }

  useEffect(() => {
    if (gameStatus === 'waiting') {
      setTextToType(chooseRandomSentence())
    }
  }, [gameStatus])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (gameStatus === 'waiting') {
      setGameStatus('in-progress')
      setStartTime(Date.now())
    }

    setUserInput(inputValue)

    if (inputValue.length === textToType.length) {
      setGameStatus('finished')
      const endTime = Date.now()
      const timeInSeconds = (endTime - startTime) / 1000
      const timeInMinutes = timeInSeconds / 60
      const wordCount = textToType.split(' ').length
      const calculatedWpm = Math.round(wordCount / timeInMinutes)
      setWpm(calculatedWpm)

      let correctChars = 0
      for (let i = 0; i < textToType.length; i++) {
        if (textToType[i] === inputValue[i]) {
          correctChars++
        }
      }
      const calculatedAccuracy = Math.round(
        (correctChars / textToType.length) * 100,
      )
      setAccuracy(calculatedAccuracy)
    }
  }

  const handlePlayAgain = () => {
    setGameStatus('waiting')
    setUserInput('')
    setWpm(0)
    setAccuracy(0)
  }

  const getHighlightedText = () => {
    return textToType.split('').map((char, index) => {
      let color = 'grey'
      if (userInput.length > index) {
        color = char === userInput[index] ? 'green' : 'red'
      }
      // Preserve spaces by using a non-breaking space when character is a space
      const displayChar = char === ' ' ? '\u00A0' : char
      return (
        <span key={index} style={{ color }}>
          {displayChar}
        </span>
      )
    })
  }

  return (
    <div className="typing-test-page">
      <div className="typing-test-container">
        <h2 className="typing-test-title">⌨️ Typing Speed Test ⌨️</h2>

        <div className="typing-test-text">{getHighlightedText()}</div>

        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={gameStatus === 'finished'}
          className="typing-test-input"
          placeholder="Start typing here..."
          autoFocus
        />

        {gameStatus === 'finished' && (
          <div className="typing-test-results">
            <h3>🎮 Results 🎮</h3>
            <div className="results-stats">
              <div className="stat-item">
                <span className="stat-label">WPM:</span>
                <span className="stat-value">{wpm}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Accuracy:</span>
                <span className="stat-value">{accuracy}%</span>
              </div>
            </div>
            <button onClick={handlePlayAgain} className="play-again-button">
              🔄 Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Typing
