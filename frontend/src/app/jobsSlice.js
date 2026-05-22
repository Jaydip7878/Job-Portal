import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await fetch('https://www.arbeitnow.com/api/job-board-api')
  if (!response.ok) {
    throw new Error('Failed to load jobs')
  }
  const data = await response.json()
  const jobs = data.data || []
  return jobs.map((job) => ({
    id: job.slug,
    role: job.title,
    company: job.company_name,
    location: job.location || (job.remote ? 'Remote' : 'Unknown'),
    salary: job.salary || 'Not specified',
    url: job.url,
    description: job.description,
    job_type: job.job_types?.join(', ') || 'N/A',
    category: job.job_types?.[0] || 'N/A',
    company_logo: null,
  }))
})

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectAllJobs = (state) => state.jobs.items
export const selectJobsStatus = (state) => state.jobs.status
export const selectJobsError = (state) => state.jobs.error
export default jobsSlice.reducer
