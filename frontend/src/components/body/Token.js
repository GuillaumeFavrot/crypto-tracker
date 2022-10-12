import React from 'react'

function Token({token}) {
  
    let name, image

    switch(token.abbreviation) {
        case 'BTC' :
            name = 'Bitcoin';
            image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'
            break
        case 'ETC':
            name = 'Ethererum'
            image = 'https://www.svgrepo.com/show/353715/ethereum.svg'
            break
        case 'XRP':
            name = 'Ripple'
            image = 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
            break;
    }


    return (
        <div>
            <div className='d-flex pt-3 pb-3 border-bottom border-dark align-items-center h-30'>
                <div className='w-10 pe-3 ps-3 text-center'>
                    <img className="img-fluid img-small" alt="..." src={image}></img>
                </div>
                <p className='text-white fs-2 bold mb-0'>{token.abbreviation}</p>
                <p className='text-white ms-1 fs-5 mb-0'>({name})</p>
                <p className='text-white ms-1 fs-5 mb-0'>(Quantity : {token.quantity})</p>
                <p className='text-white ms-1 fs-5 mb-0'>(Value : {token.buying_value})</p>
            </div>
            <div>

            </div>
        </div>

    )
}

export default Token