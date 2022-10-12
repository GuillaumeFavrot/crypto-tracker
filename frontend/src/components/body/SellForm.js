import React from 'react'
import { useSelector } from 'react-redux'

function SellForm() {

    const view = useSelector(state => state.view)

    return (
        <div className={view.page === 'Supprimer un montant' ? 'pt-5 container-fluid container-form' : 'd-none'}>

        </div>
    )
}

export default SellForm