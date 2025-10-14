interface WelcomeOverlayProps {
  onClose: () => void
}

function WelcomeOverlay({ onClose }: WelcomeOverlayProps) {
  const handleContinue = () => {
    onClose()
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-overlay-content">
        <img src="/images/init.png" alt="Echo logo" />
        <h1>❗Welcome to Echo❗</h1>
        <p>
          Echo is a messaging app where you can message your friends by logging
          on and registering an account. You can then search all users in the
          database and send chats to anyone 😲
        </p>
        <button onClick={handleContinue}>ECHO...ECHoo....EChooo.....</button>
      </div>
    </div>
  )
}

export default WelcomeOverlay
