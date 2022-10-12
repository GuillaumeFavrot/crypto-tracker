import React from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import WalletOverview from './WalletOverview'

function Body () {
  return (
    <div className='bg-black h-100 pt-5'>
        <WalletOverview />
        <BuyForm />
        <SellForm />
    </div>
  )
}

export default Body