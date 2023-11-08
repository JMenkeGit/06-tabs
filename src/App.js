import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      setError(false)
      const resp = await fetch(url)
      if (resp.status >= 200 && resp.status <= 299) {
        const newJobs = await resp.json()
        setJobs(newJobs)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setError(true)
        throw new Error(resp.statusText)
      }
    } catch (error) {
      setIsLoading(false)
      setError(true)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (isLoading) {
    return (
      <section>
        <h1 className='loading'>Loading...</h1>
      </section>
    )
  }

  if (jobs.length !== 0) {
    const { title, dates, duties, company } = jobs[value]

    return (
      <section className='section'>
        <div className='title'>
          <h2>experience</h2>
          <div className='underline'></div>
        </div>
        <div className='jobs-center'>
          {/* btn container */}
          <div className='btn-container'>
            {jobs.map((job, index) => {
              return (
                <button
                  key={job.id}
                  onClick={() => setValue(index)}
                  className={`job-btn ${index === value && 'active-btn'}`}
                >
                  {job.company}
                </button>
              )
            })}
          </div>
          {/* job info */}
          <article className='job-info'>
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className='job-date'>{dates}</p>
            {duties.map((duty, index) => {
              return (
                <div key={index} className='job-desc'>
                  <FaAngleDoubleRight className='job-icon' />
                  <p>{duty}</p>
                </div>
              )
            })}
          </article>
        </div>
        <button className='btn'>more info</button>
      </section>
    )
  }
  return (
    <main>
      <h1 className='error'>Error...</h1>
    </main>
  )
}

export default App
