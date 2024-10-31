import { useState } from 'react'
import { Header, Sidebar, Body } from './components/components.mod'
import './App.css'

const App = () => {
  return(
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <Body />
      </div>
    </>
  )
}

export default App;