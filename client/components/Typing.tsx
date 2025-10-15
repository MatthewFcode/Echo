import { useState, useEffect } from 'react'

const words = [
  'the',
  'quick',
  'brown',
  'fox',
  'jumps',
  'over',
  'lazy',
  'dog',
  'technology',
  'revolution',
  'journey',
  'thousand',
  'miles',
  'begins',
  'single',
  'step',
  'power',
  'good',
  'book',
  'sunshine',
  'rain',
  'adventure',
  'discover',
  'create',
  'inspire',
  'imagine',
  'wonder',
  'beautiful',
  'elegant',
  'dynamic',
  'swift',
  'brilliant',
  'incredible',
  'keyboard',
  'typing',
  'speed',
  'practice',
  'improve',
  'challenge',
  'words',
  'stream',
  'endless',
  'rhythm',
  'flow',
  'energy',
]

const Typing = () => {
  const [lines, setLines] = useState<string[]>([])
  const [userInput, setUserInput] = useState('')
  const [gameStatus, setGameStatus] = useState('waiting')
  const [startTime, setStartTime] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [totalChars, setTotalChars] = useState(0)
  const [correctChars, setCorrectChars] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [linesCompleted, setLinesCompleted] = useState(0)

  const generateWords = (count: number) => {
    const newWords = []
    for (let i = 0; i < count; i++) {
      newWords.push(words[Math.floor(Math.random() * words.length)])
    }
    return newWords.join(' ')
  }

  useEffect(() => {
    setLines([generateWords(10)])
    setTimeLeft(60)
  }, [])

  useEffect(() => {
    if (gameStatus !== 'in-progress') return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus('finished')
          const calculatedWpm = Math.round((linesCompleted * 10) / 1)
          setWpm(calculatedWpm)
          const calculatedAccuracy =
            totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0
          setAccuracy(calculatedAccuracy)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStatus, linesCompleted, totalChars, correctChars])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (gameStatus === 'waiting' && inputValue.length > 0) {
      setGameStatus('in-progress')
      setStartTime(Date.now())
    }

    setUserInput(inputValue)

    // Calculate accuracy
    let correct = 0
    const total = inputValue.length
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === currentLine[i]) {
        correct++
      }
    }
    setCorrectChars((prev) => prev + (correct - correctChars))
    setTotalChars(total)

    // Move to next line when user types the full line length
    if (inputValue.length > currentLine.length) {
      setLines((prev) => [...prev, generateWords(10)])
      setUserInput('')
      setLinesCompleted((prev) => prev + 1)
    }
  }

  const currentLine = lines.length > 0 ? lines[lines.length - 1] : ''

  const getHighlightedText = () => {
    if (!currentLine) return <span>Loading...</span>
    return currentLine.split('').map((char, index) => {
      let color = '#1a4d2e'
      if (userInput.length > index) {
        color = char === userInput[index] ? '#2d9d5c' : '#dc2626'
      }
      return (
        <span key={index} style={{ color }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }

  if (gameStatus === 'finished') {
    return (
      <div className="typing-test-page">
        <div className="typing-test-container">
          <div className="typing-test-results">
            <h3>🎮 Results 🎮</h3>
            <div className="results-stats">
              <div className="stat-item">
                <span className="stat-label">Lines:</span>
                <span className="stat-value">{linesCompleted}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Accuracy:</span>
                <span className="stat-value">{accuracy}%</span>
              </div>
            </div>
            <button
              onClick={() => {
                setGameStatus('waiting')
                setUserInput('')
                setWpm(0)
                setAccuracy(0)
                setTimeLeft(60)
                setLinesCompleted(0)
                setTotalChars(0)
                setCorrectChars(0)
                setLines([generateWords(10)])
              }}
              className="play-again-button"
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="typing-test-page">
      <div className="typing-test-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <h2
            className="typing-test-title"
            style={{ margin: 0, fontSize: '1.5rem' }}
          >
            ⌨️ Typing Speed Test ⌨️
          </h2>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: timeLeft <= 10 ? '#dc2626' : '#1a4d2e',
              fontFamily: 'Press Start 2P',
              minWidth: '120px',
              textAlign: 'right',
            }}
          >
            {timeLeft}s
          </div>
        </div>

        <div
          style={{
            background: 'rgba(26, 77, 46, 0.05)',
            border: '2px solid #40916c',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            minHeight: '120px',
            fontFamily: 'Courier New, monospace',
            fontSize: '1.4rem',
            lineHeight: '2',
            color: '#1a4d2e',
            textAlign: 'left',
            maxHeight: '240px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              marginBottom: '1rem',
              minHeight: '40px',
              color: '#999',
              fontSize: '0.9rem',
            }}
          >
            {lines.slice(0, -1).map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
          <div>{getHighlightedText()}</div>
        </div>

        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={gameStatus === 'finished'}
          className="typing-test-input"
          placeholder="Start typing here..."
          autoFocus
        />

        {gameStatus !== 'waiting' && gameStatus !== 'finished' && (
          <div
            style={{
              marginTop: '1.5rem',
              color: '#1a4d2e',
              fontSize: '1rem',
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
            }}
          >
            <div>
              <strong>Accuracy:</strong>{' '}
              {totalChars > 0
                ? Math.round((correctChars / totalChars) * 100)
                : 0}
              %
            </div>
            <div>
              <strong>Lines:</strong> {linesCompleted}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Typing
