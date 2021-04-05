import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/UseForm';
import { NoteAppBar } from './NoteAppBar'

export const NotePage = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, id } = formValues;


    const activeId = useRef(note.id);

    //hacemos el efecto de cambio para las vistas
    useEffect(() => {

        //hacemos una condicion en el reset en la cual indica que si y solo si
        //la id de la nota no esta activa reinicie la nota y
        // active la nota del id corresponidente
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id
        }

    }, [note, reset])

    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }));

    }, [formValues, dispatch])

    const handleDelete = () =>{

        dispatch( startDelete(id) );
    }





    return (
        <div className="notes__main-content animate__animated animate__fadeIn">

            <NoteAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name='body'
                    value={body}
                    onChange={handleInputChange} />

                {
                    (note.url)
                    && (

                        <div className="notes__images">
                            <img src={ note.url }
                                alt="imagen"
                                name='image'
                            />
                        </div>
                    )

                }
            </div>

            <button className="btn btn-danger"
                    onClick= { handleDelete }>
                Borrar
            </button>

        </div>
    )
}
