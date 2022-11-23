import React from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import WalletOverview from './WalletOverview'
import Graph from './Graph'

function Body () {
  return (
    <div className='bg-black h-100 pt-5'>
        <WalletOverview />
        <BuyForm />
        <SellForm />
        <Graph/>
    </div>
  )
}

export default Body