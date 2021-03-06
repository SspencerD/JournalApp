import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth)



    const handleLogout = () => {

        dispatch(startLogout())

    }
    const handleAdd = () => {

        dispatch(startNewNote());
    }

    const ahora = new Date();
    const hora = ahora.getHours();




    return (
        <aside className="journal__sidebar animate__animated animate__fadeIn">

            <div className="journal__sidebar-navbar">

                <h3 className=" mt-5">
                    {
                       hora<12 ?
                       <i className="far fa-sun"></i>
                       &&
                       hora>18 && hora>24 :
                       <i className="far fa-moon"></i>
                      

                    } 
                 
                    <span>  {name}</span>
                </h3>

                <button
                    className="btn"
                    onClick={handleLogout}
                > Log out</button>
            </div>


            <div
                className="journal__new-entry"
                onClick={handleAdd}>
                <i className="far fa-calendar-plus fa-5x" />
                <p className="mt-5">  New Entry</p>
            </div>

            <JournalEntries />



        </aside>
    )
}
