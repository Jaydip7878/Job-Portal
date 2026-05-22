import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.user = {
        ...user,
        desiredRole: user.desiredRole || '',
        preferredLocation: user.preferredLocation || '',
        resume: user.resume || '',
        skills: user.skills || '',
        bio: user.bio || '',
        appliedJobs: user.appliedJobs || [],
      }
      state.isAuthenticated = true
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    registerSuccess: (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.user = {
        ...user,
        desiredRole: user.desiredRole || '',
        preferredLocation: user.preferredLocation || '',
        resume: user.resume || '',
        skills: user.skills || '',
        bio: user.bio || '',
        appliedJobs: user.appliedJobs || [],
      }
      state.isAuthenticated = true
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    updateProfile: (state, action) =>
    {
      if (!state.user) return
      state.user = {
        ...state.user,
        ...action.payload,
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    applyForJob: (state, action) =>
    {
      if (!state.user) return
      const appliedJob = action.payload
      const alreadyApplied = state.user.appliedJobs?.some((job) => job.id === appliedJob.id)
      if (!alreadyApplied) {
        state.user.appliedJobs = [appliedJob, ...(state.user.appliedJobs || [])]
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { loginSuccess, registerSuccess, updateProfile, applyForJob, logout } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
