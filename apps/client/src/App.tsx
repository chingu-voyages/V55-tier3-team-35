import './App.css'
import app from '../index'
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await app.get()
        setMessage(response.data?.message || 'No message found')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app">
      <h1>Chingu Voyage Team 35</h1>
      <div>{message}</div>
    </div>
  )
}

export default App
