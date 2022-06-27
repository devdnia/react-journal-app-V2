import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from './';


export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        //uid
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        // Agregar el id de la nota
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))
    }
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        //uid
        const { uid } = getState().auth;
        if( !uid ) throw new Error('No se pudo obtener el uid');

        const notes = await loadNotes( uid );

        dispatch( setNotes(notes) );

    }
};

export const startSaveNotes = () =>{
    return async (dispatch, getState) => {
        dispatch(setSaving());
        //uid
        const { uid } = getState().auth;
        const { active: note} = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(  FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch( updateNote(note) );
    }
}