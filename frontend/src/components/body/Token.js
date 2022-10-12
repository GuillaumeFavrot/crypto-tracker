import React from 'react'

function Token({token}) {
  return (
    <div>
        <div className='d-flex pt-3 pb-3 border-bottom border-dark align-items-center h-30'>
            <div className='w-10 pe-3 ps-3 text-center'>
                <img className="img-fluid img-small" alt="..." src={token.image}></img>
            </div>
            <p className='text-white fs-2 bold mb-0'>{token.abbreviation}</p>
            <p className='text-white ms-1 fs-5 mb-0'>({token.name})</p>
            
        </div>
        <div>

        </div>
    </div>

  )
}

export default Token