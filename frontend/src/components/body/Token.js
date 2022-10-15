import React from 'react'

function Token({token}) {
  
    let name, image

    switch(token.abbreviation) {
        case 'BTC' :
            name = 'Bitcoin';
            image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'
            break
        case 'ETH':
            name = 'Ethererum'
            image = 'https://www.svgrepo.com/show/353715/ethereum.svg'
            break
        case 'XRP':
            name = 'Ripple'
            image = 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
            break;
    }

    let profit = token.profitper

    if (token.buying_value < 0) {
        profit *= -1
    }

    return (
        <div className='border-bottom border-dark d-flex flex-row justify-content-between align-items-center'>
            <div className='d-flex pt-3 pb-3 align-items-center h-30'>
                <div className='w-10 pe-3 ps-3 text-center'>
                    <img className="img-fluid img-small" alt="..." src={image}></img>
                </div>
                <p className='text-white fs-2 bold mb-0'>{token.abbreviation}</p>
                <p className='text-white ms-1 fs-5 mb-0'>({name})</p>
            </div>
            <div className='d-flex flex-row'>
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

    )
}

export default Token