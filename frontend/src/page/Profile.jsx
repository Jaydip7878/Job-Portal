import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, updateProfile } from '../app/authSlice'
import '../styles.css'

export default function Profile() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [desiredRole, setDesiredRole] = useState('')
  const [preferredLocation, setPreferredLocation] = useState('')
  const [resume, setResume] = useState('')
  const [skills, setSkills] = useState('')
  const [bio, setBio] = useState('')
  const [message, setMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const resetForm = () => {
    if (!user) return
    setFullName(user.name || '')
    setEmail(user.email || '')
    setDesiredRole(user.desiredRole || '')
    setPreferredLocation(user.preferredLocation || '')
    setResume(user.resume || '')
    setSkills(user.skills || '')
    setBio(user.bio || '')
  }

  useEffect(() => {
    resetForm()
  }, [user])

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(
      updateProfile({
        name: fullName,
        desiredRole,
        preferredLocation,
        resume,
        skills,
        bio,
      })
    )
    console.log(user)
    setMessage('Profile saved successfully.')
    setIsEditing(false)

    window.setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const handleCancel = () => {
    resetForm()
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Profile</h2>
          <p>Please login to view and edit your job profile.</p>
        </div>
      </div>
    )
  }

  const appliedJobs = user.appliedJobs || []
  const latestApplication = appliedJobs[0]

  return (
    <div className="profile-page">
      <div className="section-title">
        <h2>My Profile</h2>
        <p>View and update your job profile details, resume, and application history.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card profile-header-card">
          <div className="profile-top">
            <div className="profile-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-headline">
              <h3>{user.name}</h3>
              <p>{user.desiredRole || 'Job seeker'}</p>
              <span>{user.email}</span>
            </div>
            <button className="edit-profile-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          </div>

          <div className="profile-stat-grid">
            <div className="profile-stat-card">
              <span>Applied jobs</span>
              <strong>{appliedJobs.length}</strong>
            </div>
            <div className="profile-stat-card">
              <span>Preferred location</span>
              <strong>{user.preferredLocation || 'Any'}</strong>
            </div>
            <div className="profile-stat-card">
              <span>Desired role</span>
              <strong>{user.desiredRole || 'Not set'}</strong>
            </div>
          </div>

          <div className="profile-summary">
            <h3>Career summary</h3>
            <p>{user.bio || 'Add a short career summary by editing your profile.'}</p>
          </div>

          <div className="profile-summary">
            <h3>Resume / Notes</h3>
            <p>{user.resume || 'Add your resume summary or application notes here.'}</p>
          </div>
        </div>

        <div className="profile-card profile-details-card">
          <h2>{isEditing ? 'Edit Profile Details' : 'Profile details'}</h2>
          {message && <div className="success-message">{message}</div>}
          {isEditing ? (
            <form className="profile-form" onSubmit={handleSave}>
              <div className="form-row">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} disabled />
              </div>
              <div className="form-row">
                <label htmlFor="desiredRole">Desired Job Title</label>
                <input
                  id="desiredRole"
                  type="text"
                  value={desiredRole}
                  onChange={(e) => setDesiredRole(e.target.value)}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div className="form-row">
                <label htmlFor="preferredLocation">Preferred Location</label>
                <input
                  id="preferredLocation"
                  type="text"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  placeholder="e.g. Remote, New York"
                />
              </div>
              <div className="form-row">
                <label htmlFor="skills">Skills</label>
                <input
                  id="skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, JavaScript, CSS"
                />
              </div>
              <div className="form-row">
                <label htmlFor="bio">Career Summary</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write a short professional summary"
                />
              </div>
              <div className="form-row">
                <label htmlFor="resume">Resume / Cover Note</label>
                <textarea
                  id="resume"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your resume summary or application notes"
                />
              </div>
              <div className="profile-actions">
                <button type="submit" className="auth-btn">
                  Save Profile
                </button>
                <button type="button" className="secondary-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-readonly">
              <div className="profile-info-row">
                <strong>Desired role</strong>
                <span>{user.desiredRole || 'Not set'}</span>
              </div>
              <div className="profile-info-row">
                <strong>Preferred location</strong>
                <span>{user.preferredLocation || 'Any'}</span>
              </div>
              <div className="profile-info-row">
                <strong>Skills</strong>
                <span>{user.skills || 'Not added yet'}</span>
              </div>
              <div className="profile-info-row">
                <strong>Career summary</strong>
                <span>{user.bio || 'No summary yet'}</span>
              </div>
              <div className="profile-info-row">
                <strong>Resume / notes</strong>
                <span>{user.resume || 'No resume details yet'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-card profile-applications">
        <h2>Application History</h2>
        {appliedJobs.length > 0 ? (
          <ul className="profile-jobs-list">
            {appliedJobs.map((job) => (
              <li className="profile-job-item" key={job.id}>
                <strong>{job.role}</strong>
                <p>{job.company} • {job.location || 'Unknown location'}</p>
                <p className="application-date">Applied on {new Date(job.appliedAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications yet. Apply to jobs to see them here.</p>
        )}
      </div>
    </div>
  )
}
