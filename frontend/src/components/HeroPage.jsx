import React from 'react'

export default function HeroPage() {
  return (
    <div>
      <div className="hero-content">
        <h2>Find Your Dream Frontend Job</h2>
        <p>
          Explore top frontend opportunities from leading companies around the world.
        </p>

        <div className="search-box">
          <input type="text" placeholder="Search frontend jobs..." />
          <button>Search</button>
        </div>
      </div>
    </div>
  )
}
