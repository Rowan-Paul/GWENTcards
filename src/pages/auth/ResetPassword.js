import { useState } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'

import { resetPasswordRequest, resetPassword } from '../../redux/auth/actions'

function ResetPasswordUI(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const parsed = queryString.parse(props.location.search)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRequest = () => {
    props.resetPasswordRequest(username)
  }
  const handleReset = () => {
    props.resetPassword(parsed.token, password)
    props.history.push('/signin')
  }

  if (parsed.token) {
    return (
      <div className="mt-20">
        <h1>Reset password</h1>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-auto md:w-1/2 lg:w-1/4">
          <p>Fill in a new password.</p>

          <div className="mb-6">
            <label
              className="text-left ml-5 block text-gray-500 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
              id="password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="grid  grid-cols-3 md:grid-cols-10 gap-5 justify-items-center">
            <button
              className="col-span-6 md:justify-self-start text-white bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded "
              type="button"
              onClick={handleReset}
            >
              Send link
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="mt-20">
        <h1>Reset password</h1>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-auto md:w-1/2 lg:w-1/4">
          <p>
            Fill in your email or username that belongs to your account. We will
            send you a link to reset your password.
          </p>
          <div className="mb-4">
            <label
              className="text-left ml-5 block text-gray-500 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              id="username"
              type="text"
              placeholder="Fill in username or email..."
              onChange={handleUsernameChange}
            />
          </div>

          <div className="grid  grid-cols-3 md:grid-cols-10 gap-5 justify-items-center">
            <button
              className="col-span-6 md:justify-self-start text-white bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded "
              type="button"
              onClick={handleRequest}
            >
              Send link
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetPasswordRequest: (username) => dispatch(resetPasswordRequest(username)),
  resetPassword: (token, password) => dispatch(resetPassword(token, password)),
})

export const ResetPassword = connect(
  null,
  mapDispatchToProps
)(withRouter(ResetPasswordUI))