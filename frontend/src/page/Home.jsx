import React from 'react'
import HeroPage from '../components/HeroPage'
import Card from '../components/Card'

export default function Home() {
  return (
    <div>
      <HeroPage />
      <section className="jobs-section">
        <div className="section-title">
          <h2>Featured Jobs</h2>
        </div>
        <Card />
      </section>
    </div>
  )
}
