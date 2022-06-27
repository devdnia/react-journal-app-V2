
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,

        /** Ejemplo de nota
         * active: [
         *  id: 'adaddadf',
         *  title: '',
         *  body: '',
         *  date: 1223431,
         *  imageUrls: [], https://photo1.jpg, ...
         * ]
         */

    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
            state.messageSaved= '';
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
            // TODO: mensaje de error...
        },
        updateNote: (state, action) => { // payload: note
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });

            // TODO: mostrar mensaje de actualización
            state.messageSaved = `${ action.payload.title } actualizada correctamente`;
        },
        deleteNoteById: (state, action) => {
        },
    }

});


// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
} = journalSlice.actions;