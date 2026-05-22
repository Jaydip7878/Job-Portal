import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllJobs } from '../app/jobsSlice'

export default function Companies() {
  const jobs = useSelector(selectAllJobs)
  const navigate = useNavigate()

  const handleCompanyClick = (companyName) =>
  {
    navigate(`/jobs?company=${encodeURIComponent(companyName)}`)
    console.log(companyName, "......here is company name")
  }

  const companies = Object.values(
    jobs.reduce((acc, job) =>
    { 
      const key = job.company || 'Unknown Company'
      if (!acc[key]) {
        acc[key] = {
          name: key,
          logo: job.company_logo,
          jobs: [],
          locations: job.location,
          types: new Set(),
          sampleRoles: [],
          overview: job.description || '',
        }
      }

      acc[key].jobs.push(job)
      acc[key].types.add(job.job_type)
      if (acc[key].sampleRoles.length < 3 && !acc[key].sampleRoles.includes(job.role)) {
        acc[key].sampleRoles.push(job.role)
      }
      return acc
    }, {})
  )

  return (
    <section className="companies-page">
      <div className="section-title">
        <h2>Top Hiring Companies</h2>
        <p>
          Explore leading employers currently hiring for developer roles, with
          active openings, location details, and a quick snapshot of each
          company.
        </p>
      </div>

      <div className="company-grid">
        {companies.map((company) => (
          <article
            className="company-card company-card-clickable"
            key={company.name}
            role="button"
            tabIndex={0}
            onClick={() => handleCompanyClick(company.name)}
            onKeyDown={(e) =>
            {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCompanyClick(company.name)
              }
            }}
          >
            <div className="company-card-header">
              <div className="company-logo-wrap">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="company-logo"
                    onError={(e) =>
                    {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/80?text=Logo'
                    }}
                  />
                ) : (
                  <div className="company-logo-placeholder">{company.name.charAt(0)}</div>
                )}
              </div>
              <div>
                <h3>{company.name}</h3>
                <p className="company-tagline">
                  {company.jobs.length} active role{company.jobs.length > 1 ? 's' : ''}
                  {' · '}
                  {company.locations}
                </p>
              </div>
            </div>

            <div className="company-meta">
              <div className="meta-item">
                <span>Locations</span>
                <strong>{company.locations || 'Remote'}</strong>
              </div>
              <div className="meta-item">
                <span>Job Types</span>
                <strong>{Array.from(company.types).join(', ') || 'N/A'}</strong>
              </div>
              <div className="meta-item">
                <span>Open Roles</span>
                <strong>{company.jobs.length}</strong>
              </div>
            </div>

            <div className="company-overview">
              {company.overview ? (
                <p>{company.overview.slice(0, 150)}...</p>
              ) : (
                <p>
                  This company is a strong employer in the current job market and
                  is actively recruiting developers across multiple teams.
                </p>
              )}
            </div>

            <div className="company-roles">
              {company.sampleRoles.filter((role, index) => index <= 1).map((role, index) => (
                <span className="role-badge" key={index}>
                  {role}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
