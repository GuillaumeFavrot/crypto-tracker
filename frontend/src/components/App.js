// The App.js file is the main component of the app.
// All other components are organized inside this App.js file.

import React from 'react'
import { useEffect } from 'react'
import { getTestMessage } from './state/features/testSlice'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import Body from './Body.js'
import Navbar from './Navbar.js'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTestMessage())
  }, [])

  return (
    <div className="application">
      <Navbar />
      <Body />
    </div>
  )
}

export default App