import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectIsAuthenticated, logout } from '../app/authSlice'

export default function Navbar() {
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () =>
  {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar">
        <h1>JobPortal</h1>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <div className="user-section">
                <span className="user-name">Welcome, {user?.name}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
