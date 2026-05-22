import React, { useEffect, useState } from 'react'
import './pagination.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  selectAllJobs,
  selectJobsStatus,
  selectJobsError,
} from '../app/jobsSlice'
import { selectIsAuthenticated, selectUser, applyForJob } from '../app/authSlice'
import paginate from 'react-paginate'

export default function Job() {
  const ReactPaginate = paginate.default || paginate

  const dispatch = useDispatch()
  const jobs = useSelector(selectAllJobs)
  const status = useSelector(selectJobsStatus)
  const error = useSelector(selectJobsError)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const [search, setSearch] = useState('')
  const [debounceValue, setDebounceValue] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const appliedJobs = user?.appliedJobs || []
  const [itemOffset, setItemOffset] = useState(0)

  const itemsPerPage = 10;


  const filteredJobs = jobs.filter(
    (j) =>
      j.company.toLowerCase().includes(debounceValue.toLowerCase()) ||
      j.role.toLowerCase().includes(debounceValue.toLowerCase()) ||
      j.location.toLowerCase().includes(debounceValue.toLowerCase())
  );

  const endOffset = itemOffset + itemsPerPage;

  const currentJobs = filteredJobs.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageClick = (event) =>
  {
    const newOffset =
      (event.selected * itemsPerPage) % filteredJobs.length;

    setItemOffset(newOffset);
  };

  useEffect(() =>
  {
    const params = new URLSearchParams(location.search)
    const companyFilter = params.get('company') || ''

    if (companyFilter) {
      setSearch(companyFilter)
      setDebounceValue(companyFilter)
    }
  }, [location.search])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(search)

    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() =>
  {
    setItemOffset(0);
  }, [debounceValue]);



  // console.log(typeof ReactPaginate, "here is pagination isssue")

  const handleApply = (job) =>
  {
    if (!isAuthenticated) {
      alert('Please login first to apply for jobs')
      navigate('/login')
      return
    }

    const alreadyApplied = appliedJobs.some((item) => item.id === job.id)
    if (alreadyApplied) {
      alert('You have already applied for this job.')
      return
    }

    dispatch(
      applyForJob({
        id: job.id,
        role: job.role,
        company: job.company,
        location: job.location,
        appliedAt: new Date().toISOString(),
      })
    )
    alert('Application submitted for job: ' + job.role)
  }

  if (status === 'loading') {
    return <div className="jobs-grid">Loading jobs...</div>
  }

  if (status === 'failed') {
    return <div className="jobs-grid">Error loading jobs: {error}</div>
  }

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search frontend jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="jobs-grid">
        {currentJobs.length === 0 ? (
          <p>No jobs match that search.</p>
        ) : (
            currentJobs.map((job) => (
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
                <button
                  className="apply-btn"
                    onClick={() => handleApply(job)}
                    disabled={appliedJobs.some((item) => item.id === job.id)}
                >
                    {appliedJobs.some((item) => item.id === job.id) ? 'Already Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        pageCount={pageCount}
        onPageChange={handlePageClick}

        containerClassName="pagination"
        activeClassName="active"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </div>
  )
}
