import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGraph } from './../state/features/walletSlice'
import plot from './plot.png'

function Graph() {

  const view = useSelector(state => state.view)

  const dispatch = useDispatch()

  const updateGraph = () => {
    dispatch(getGraph())
  }

  return (
    <div className={view.page === "Evolution du portefeuille" ? "pt-5 container-fluid container-form text-white d-flex flex-column" : "d-none"}>
      <button onClick={() => updateGraph()} className='btn btn-success'>Update graph</button>
      <img src={plot} alt=""></img>
    </div>
  )
}

export default Graph