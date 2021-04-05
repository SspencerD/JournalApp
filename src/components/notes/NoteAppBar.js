import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { startSaveNote, startUpLoading } from '../../actions/notes';

export const NoteAppBar = () => {


    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes );

    const handleSave =() =>{

        dispatch(startSaveNote( active) );

    }

    const handleAddImg = ()=>{
        
        document.querySelector('#imagen').click();


    }

    const handleFileChange = (e) =>{

        const file = e.target.files[0];
        if( file ){
            dispatch(startUpLoading(file));
        }
        
    }

    const date = new Date().getTime();

    const datenow = moment( date );

    
    return (

        <div className="notes__appbar">

            <span> {
            datenow.format('LL')
            }
            </span>

            <input
            id='imagen'
            type="file"
            name='file'
            style={{display: 'none'}}
            onChange={ handleFileChange }/>
           
          
            <div>
                <button 
                className="btn"
                onClick={handleAddImg}>
                    Picture
                </button>
                <button className="btn"
                onClick={handleSave}>
                    Save
                </button>


            </div>
            
        </div>
    )
}
