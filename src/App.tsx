import { useState } from 'react'
import { Header, Sidebar, Body, Holding } from './components/components.mod'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

const App = () => {
  return(
    <Router>
      <Header />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/drivers" element={<Holding title={"Drivers"} />} />
          <Route path="/vehicles" element={<Holding title={"Vehicles"} />} />
          <Route path="/about" element={<Holding title={"About"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;