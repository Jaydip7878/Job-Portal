import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../app/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import '../styles.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) =>
  {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate API call - in real app, this would be to your backend
      if (!email || !password) {
        setError('Email and password are required')
        setLoading(false)
        return
      }

      // Generate a token (in real app, this comes from server)
      const token = 'token_' + Math.random().toString(36).substr(2, 9)
      const user = {
        id: 1,
        email: email,
        name: email.split('@')[0],
      }

      dispatch(loginSuccess({ token, user }))
      setEmail('')
      setPassword('')
      navigate('/jobs')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}
