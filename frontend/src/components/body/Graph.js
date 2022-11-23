import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import plot from './plot.png'

function Graph() {

  const view = useSelector(state => state.view)

  const dispatch = useDispatch()

  const getData = () => {
    console.log('Get data')
  }

  return (
    <div className={view.page === "Evolution du portefeuille" ? "pt-5 container-fluid container-form text-white d-flex flex-column" : "d-none"}>
      <button onClick={() => getData()} className='btn btn-success'>Get data!!</button>
      <img src={plot} alt=""></img>
    </div>
  )
}

export default Graph