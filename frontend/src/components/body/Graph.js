import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGraph } from './../state/features/walletSlice'

function Graph() {

  const view = useSelector(state => state.view)
  const graphId = useSelector(state => state.wallet.graphId)

  const dispatch = useDispatch()

  //Local state
  const [token, setToken] = useState('total')
  const [report, setReport] = useState('profit')
  const [period, setPeriod] = useState('all')

  //This is the IP address this component will fetch the plot on
  let ip

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ip = '127.0.0.1:8000'
  } else {
    ip = process.env.REACT_APP_PROD_IP
  }


  //User input detection functions 
  const onTokenChange = (e) => {
    setToken(e.target.value)
  }

  const onReportChange = (e) => {
    setReport(e.target.value)
  }

  const onPeriodChange = (e) => {
    setPeriod(e.target.value)
  }

  //Graph update request function
  const updateGraph = () => {
    let request = {
      token: token,
      report: report,
      period: period
    }
    dispatch(getGraph(request))
    setToken('total')
    setReport('profit')
    setPeriod('all')    
  }

  return (
    <div className={view.page === "Evolution du portefeuille" ? "pt-5 container-fluid container-form text-white d-flex flex-column" : "d-none"}>
      <img src={`http://${ip}/api/history/plot/${graphId}`} alt=""></img>

      <div className='d-flex flex-row mb-1 mt-3'>

        <select onChange={(e) => onTokenChange(e)} value={token} className="form-select me-1 bg-black border-secondary pt-1 pb-1 text-white" aria-label="Default select example">
          <option selected disabled>Crypto</option>
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="xrp">Ripple (XRP)</option>
          <option value="total">Portefeuille total</option>
        </select>

        <select onChange={(e) => onReportChange(e)} value={report} className="form-select me-1 bg-black border-secondary pt-1 pb-1 text-white" aria-label="Default select example">
          <option selected disabled>Rapport</option>
          <option value="profit">Profit (en euros)</option>
          <option value="profitper">Profit (en %)</option>
          <option value="current_value">Valeur portefeuille (en euros)</option>
          <option value="price">Prix unitaire (crypto uniquement)</option>
        </select>

        <select onChange={(e) => onPeriodChange(e)} value={period} className="form-select me-1 bg-black border-secondary text-white" aria-label="Default select example">
          <option selected disabled>Période</option>
          <option value="day">Une journée</option>
          <option value="week">Une semaine</option>
          <option value="month">Un mois</option>
          <option value="all">Depuis le début</option>
        </select> 
      <button onClick={() => updateGraph()} className="btn btn-secondary w-10 fs-4 text-black pt-1 pb-1">ok</button>
      </div>
    </div>
  )
}

export default Graph