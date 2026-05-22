import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllJobs, selectJobsStatus, selectJobsError } from '../app/jobsSlice'

export default function Card() {
  const jobs = useSelector(selectAllJobs)
  const status = useSelector(selectJobsStatus)
  const error = useSelector(selectJobsError)

  if (status === 'loading') {
    return <div className="jobs-grid">Loading jobs...</div>
  }

  if (status === 'failed') {
    return <div className="jobs-grid">Error loading jobs: {error}</div>
  }

  return (
   <div className="jobs-grid">
        {jobs.length === 0 ? (
          <p>No jobs match that search.</p>
        ) : (
            jobs.slice(0,3).map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-left">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.company + ' logo'}
                    className="company-logo-small"
                  />
                ) : (
                  <div className="company-logo-placeholder-small">
                    {job.company && job.company.charAt(0)}
                  </div>
                )}
              </div>

              <div className="job-main">
                <div className="job-title">
                  <h3>{job.role}</h3>
                  <h4>{job.company}</h4>
                </div>

                <div className="job-info">
                  <p className="location">📍 {job.location}</p>
                  <p className="salary">💰 ${job.salary}</p>
                </div>

                <div className="job-tags">
                  {job.type && <span className="tag">{job.type}</span>}
                  {job.remote && <span className="tag">Remote</span>}
                </div>
              </div>

              <div className="job-actions">
                {/* <button
                  className="apply-btn"
                  onClick={() => handleApply(job.id)}
                >
                  Apply Now
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>
  )
}
