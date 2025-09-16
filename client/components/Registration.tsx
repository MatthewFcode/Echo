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
    <div>
      <div>
        <IfAuthenticated>
          <h1>Choose a username and profile picture for Whats Up!!</h1>
          {errorMsg && (
            <div>
              Error: {errorMsg}
              <button onClick={hideError}>Okay</button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName">Username: </label>
              <input
                style={{ border: '1px solid black', margin: '0.2vw' }}
                type="text"
                id="userName"
                name="userName"
                value={form.userName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="profile-piccture">Profile Picture:</label>
              <input
                style={{ border: '1px solid black', margin: '0.2vw' }}
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <button
                style={{ border: '1px solid black', margin: '0.2vw' }}
                disabled={!form.userName}
              >
                Register
              </button>
            </div>
          </form>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <h1>Please sign in</h1>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}

export default Register
