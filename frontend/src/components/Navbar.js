import { Collapse } from 'bootstrap';
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {modifyPage} from './state/features/viewSlice'


  function Navbar() {

    const view = useSelector(state => state.view)

    const pageRequest = (e, request) => {
        e.preventDefault()
        dispatch(modifyPage(request))
    }

    const dispatch = useDispatch()

    return (
      <div>
        <nav className="fixed-top navbar navbar-dark navbar-expand-lg bg-black border-bottom border-dark h-85">
          <div className={view.page === "home" ? "container-fluid text-light": "container-fluid text-light d-none"}>
            <h1 className="mb-0 bold">
                Crypto Tracker
            </h1>
            <div>
                <a href="" onClick={(e) => pageRequest(e, 'Supprimer un montant')} className="me-3 ms-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </a>
                <a href="" onClick={(e) => pageRequest(e, 'Ajouter une transaction')} className="me-3 ms-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </a>
            </div>
          </div>
          <div className={view.page === "home" ? "container-fluid text-light d-none" : "container-fluid text-light"}>
            <a href="" onClick={(e) => pageRequest(e, 'home')} className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </a>
            <h3  className="mb-1 mt-1 bold">{view.page}</h3>
            <div></div>
          </div>
        </nav>
      </div>
    );
  }

export default Navbar
