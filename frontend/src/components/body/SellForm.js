import React, { useEffect, useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modifyWallet } from './../state/features/walletSlice'

function SellForm() {
    
    //Global state
    const view = useSelector(state => state.view)
    const wallet = useSelector(state => state.wallet)

    //Local state
    const [token, setToken] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [maxQuantity, setMaxQuantity] = useState(0)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    //Dispatcher setup
    const dispatch = useDispatch()

    //Setter functions

    const onTokenChange = (e) => {
        setToken(e.target.value)
        setSuccess('')
    }

    const onQuantityChange = (e) => {
        setQuantity(parseFloat(e.target.value))
        setSuccess('')
    }

    //Get max function

    useEffect(() => {
            for (let i = 0; i < wallet.wallet.length; i++) {
                if(wallet.wallet[i].abbreviation === token) {
                    setMaxQuantity(wallet.wallet[i].quantity)
                }
            }
        }, [token])

    //Status message resetter

    useEffect(() => {
        setSuccess('')
        setError('')
        setQuantity(0)
        setToken('')
    }, [view])
    
    //Submit function
    const onSubmit = (e) => {
        e.preventDefault()
        setError('')

        let current_quantity = 0

        for (let i=0; i < wallet.wallet.length; i++) {
            if (wallet.wallet[i]['abbreviation'] === token) {
                current_quantity = wallet.wallet[i]['quantity'] 
            }
        }
        
        if (token !== 'Sélectionnez une crypto' && token !== '') {
            if(quantity !== 0 ) {
                if(quantity <= current_quantity) {
                    const transaction = {
                        token: token,
                        quantity: -quantity,
                    }
                    try {
                        dispatch(modifyWallet(transaction))
                        setSuccess('Transaction enregistrée avec succès!')
                    } catch (e) {
                        console.error(e)
                        setError("Erreur lors de l'enregistrement de la transaction")
                    }
                    setToken('')
                    setQuantity(0)
                    setMaxQuantity(0)
                } else {
                    setError('Quantité de crypto disponible insuffisante pour réaliser cette transaction')
                }
            } else {
                setError('Veuillez saisir une quantité supérieure à 0')
            }
        } else {
            setError('Veuillez sélectionner une crypto');
        }
    }


    return (
        <div className={view.page === "Supprimer un montant" ? "pt-5 container-fluid container-form" : "d-none"}>
            <form onSubmit={(e) => {onSubmit(e)}}className="h-100 d-flex flex-column justify-content-between">
                <div>
                    <div className="mb-5 d-flex align-items-center">
                        <select onChange={(e) => onTokenChange(e)} value={token} className="bg-black border-secondary form-control ps-5 pt-3 pb-3 text-white" placeholder="Sélectionner une crypto" id="token" aria-describedby="token">
                            <option >Sélectionnez une crypto</option>
                            <option name="BTC" value="BTC">BTC (Bitcoin)</option>
                            <option name="ETH" value="ETH">ETC (Ethereum)</option>
                            <option name="XRP" value="XRP">XRP (Ripple)</option>
                        </select>
                        <i className="position-fixed ms-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </i>
                    </div>
                    <div className="mb-5 d-flex align-items-center">
                        <input onChange={(e) => onQuantityChange(e)} value={quantity} type="number" min="0" step="0.001" className="bg-black border-secondary form-control ps-5 pt-3 pb-3 text-white" placeholder="Quantité" id="quantity" aria-describedby="quantity"></input>
                        <i className="position-fixed ms-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" className="bi bi-coin" viewBox="0 0 16 16">
                                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                            </svg>
                        </i>
                    </div>
                    <p className="position-relative mt-3 text-white max">
                            (Max: {maxQuantity})
                    </p>
                </div>
                <div className="ps-5 pe-5 mb-4">                
                    <div className={error !== '' ? "d-block text-danger bold text-center" : 'd-none'}>
                        {error}
                    </div>
                    <div className={success !== '' ? "d-block text-success bold text-center" : 'd-none'}>
                        {success}
                    </div>
                    <button type="submit" className="btn btn-secondary w-100 fs-1 text-black pt-2 pb-2 mt-3">Valider</button>
                </div>
            </form>
        </div>
    )
}

export default SellForm