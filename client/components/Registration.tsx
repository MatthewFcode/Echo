import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { useUsers } from '../hooks/useUsers'
import { IfAuthenticated, IfNotAuthenticated } from './Authorization'

function Register() {
  const [errorMsg, setErrorMsg] = useState('')
  const { getAccessTokenSilently } = useAuth0()
  const user = useUsers()

  const handleMutationSuccess = () => {
    setErrorMsg('')
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMsg(error.message)
    } else {
      setErrorMsg('unknown error..')
    }
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleError,
  }

  const navigate = useNavigate()
  const [form, setForm] = useState({
    userName: '',
    file: null as File | null,
  })

  useEffect(() => {
    if (user.data) navigate('/')
  }, [user.data, navigate])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.files && evt.target.files[0]) {
      setForm({ ...form, file: evt.target.files[0] })
    }
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()

    const formData = new FormData()
    formData.append('userName', form.userName)
    if (form.file) {
      formData.append('profile_pic', form.file)
    }
    user.add.mutate({ formData, token }, mutationOptions)
    navigate('/')
  }

  const hideError = () => {
    setErrorMsg('')
  }

  return (
    <>
      <IfAuthenticated>
        <div className="register-container">
          <div className="register-content">
            <h1>Welcome to Whats Up! 🎮</h1>
            {errorMsg && (
              <div className="register-error">
                <span>Error: {errorMsg}</span>
                <button onClick={hideError}>Okay</button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="userName">Choose Your Username</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                  placeholder="Enter a cool username..."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile_pic">Upload Profile Picture</label>
                <input
                  type="file"
                  id="profile_pic"
                  name="profile_pic"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={!form.userName}
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="not-authenticated">
          <h1>Please sign in to continue</h1>
        </div>
      </IfNotAuthenticated>
    </>
  )
}

export default Register
