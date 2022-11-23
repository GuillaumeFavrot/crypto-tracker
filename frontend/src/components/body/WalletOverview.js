import React from 'react'
import Token from './Token'
import { useSelector, useDispatch } from 'react-redux'
import {modifyPage} from '../state/features/viewSlice'

function WalletOverview() {
    
    const wallet = useSelector(state => state.wallet)
    const view = useSelector(state => state.view)
    
    const dispatch = useDispatch()

    const pageRequest = (e, request) => {
        e.preventDefault()
        dispatch(modifyPage(request))
    }

    let profit = wallet.total.profitper

    if (wallet.total.buying_value < 0) {
        profit *= -1
    }

    return (
        <div className={view.page === "home" ? 'pt-5' : 'd-none'}>
            <div className='fs-1 bold mt-3 mb-3 text-white w-100 text-center'>
                <a onClick={(e) => pageRequest(e, 'Evolution du portefeuille')} href='#' className='link'>
                    <div className={profit > 0 ? "text-success big-font" : "text-danger big-font"}>
                        {wallet.total.profit}
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-currency-euro mb-2" viewBox="0 0 16 16">
                            <path d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z"/>
                        </svg>
                    </div>
                </a>
                <div className='d-flex justify-content-center'>
                    <div className={profit > 0 ? "text-success" : "text-danger"}>
                        {wallet.total.profitper} %
                    </div>
                    <div className='d-flex flex-row ms-3'>
                        <div className={profit > 20 ? 'text-success d-block' : "d-none"} name="sharp increase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>
                        </div>
                        <div className={profit > 0 ? 'text-success d-block' : "d-none"} name="increase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>
                        </div>
                        <div className={profit < 0 ? 'text-danger d-block' : "d-none"} name="decrease">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </div>
                        <div className={profit < -20 ? 'text-danger d-block' : "d-none"}  name="sharp decrease">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid container-centered mt-5'>
                {wallet.wallet.map((token)=>(
                    <Token key={token.abbreviation} token={token}/>
                ))}       
            </div>
        </div>
    )
}

export default WalletOverview