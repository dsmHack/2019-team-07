import React from 'react'
import { navigate } from 'gatsby'
import { handleLogin, isLoggedIn } from '../components/auth.js'

class Login extends React.Component {
  handleSubmit() {return  handleLogin(user => navigate(`/app/profile`))}
  render() {
    return (
      <>
        <h1>Log in</h1>
        <button onClick={this.handleSubmit}>log in</button>
      </>
    )
  }
}

export default Login