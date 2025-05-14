import './App.css'
import app from '../index'
import { use } from 'react'

function App() {
  const { data } = use(app.get())
  return (
    <div className="app">
      <h1>Chingu Voyage Team 35</h1>
      <div>{data?.message}</div>
    </div>
  )
}

export default App
