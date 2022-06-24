import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote } from './';

export const startNewNote = () => {
    return async (dispatch, getState ) => {
    
    dispatch( savingNewNote());

    //uid
    const { uid } = getState().auth;

    const newNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
    }

    const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    // Agregar el id de la nota
    newNote.id = newDoc.id;

    // dispatch
    dispatch(addNewEmptyNote( newNote ));
    dispatch( setActiveNote(newNote ))

    }

};