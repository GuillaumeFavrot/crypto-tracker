// The App.js file is the main component of the app.
// All other components are organized inside this App.js file.

import React from 'react'
import { useEffect } from 'react'
import { getWallet } from './state/features/walletSlice'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import Body from './body/Body.js'
import Navbar from './Navbar.js'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWallet())
  }, [])

  return (
    <div className="application container-fluid d-flex flex-column">
      <div>
        <Navbar />
      </div>
      <div>
        <Body />
      </div>
    </div>
  )
}

export default App