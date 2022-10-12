import React from 'react'
import { useSelector } from 'react-redux'
import Token from './Token'

function WalletOverview() {
    
    const wallet = useSelector(state => state.wallet)
    const view = useSelector(state => state.view)


    return (
        <div className={view.page === "home" ? 'pt-5' : 'd-none'}>
            <div className='big-font bold mt-3 mb-3 text-white w-100 text-center'>
                Profit
            </div>
            <div className='container-fluid container-centered mt-5'>
                {wallet.wallet.map((token)=>(
                    <Token key={token.name} token={token}/>
                ))}       
            </div>
        </div>
    )
}

export default WalletOverview