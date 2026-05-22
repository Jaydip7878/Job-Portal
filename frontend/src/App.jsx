import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './styles.css'
import Home from './page/Home'
import Job from './page/Job'
import Companies from './page/Companies'
import Login from './page/Login'
import Register from './page/Register'
import Profile from './page/Profile'
import { fetchJobs } from './app/jobsSlice'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}