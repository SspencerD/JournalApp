import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id,newNote));
    }

};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});

export const addNewNote = (id, note)=>({

    type: types.notesAddNew,
    payload:{
        id, ...note
    }

});




export const startLoadNotes = (uid) => {

    return async (dispatch) => {

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }
}

export const setNotes = (notes) => ({

    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = (note) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        //si no existe la imagen, no la carge y borrala del object.
        if (!note.url) {
            delete note.url;
        }

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);

        try {

            if(note.title === ''){
                Swal.fire('Error','Debes cargar información a tu nota antes de guardar','error');
            }else{

                dispatch(refreshNote(note.id, noteToFireStore));
                Swal.fire('Se ha cargado correctamente tu nota', note.title, 'success');
             
            }

        }
        catch {

            Swal.fire('Error', 'ha ocurrido un error al guardar , prueba mas tarde', 'error')


        };





    }
}

export const refreshNote = (id, note) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUpLoading = (file) => {
    return async( dispatch, getState ) => {

        const {active:activeNote} = getState().notes;

        Swal.fire({
            title:'Cargando...',
            text:'Por favor espere',
            showConfirmButton: false,
            onBeforeOpen: () =>{

                Swal.showLoading();
            }

        })

       const fileUrl = await fileUpload(file);
       activeNote.url = fileUrl;

       dispatch(startSaveNote(activeNote) )

    }
}


export const startDelete=( id ) =>{
    return async(dispatch , getState) => {

        const uid = getState().auth.uid;
        try {

            await db.doc(`${uid}/journal/notes/${ id }`).delete();

            Swal.fire({
                title:'Estas seguro borrar la nota?',
                showCancelButton: true,
                confirmButtonText:'Si',
                denyButtonText:'Borrar',
            }).then((result) =>{
                if(result.isConfirmed){
                    dispatch(deleteNote( id ));
                    Swal.fire('Hecho!','','success')    
                }else if (result.isDenied){


                }
            });


            
        } catch (error) {
            console.log(error);
            
        }

    }

}

export const deleteNote = (id) =>({

    type: types.notesDelete,
    payload: id
})

export const noteLogout = () =>({

    type: types.notesLogoutCleaning

})




