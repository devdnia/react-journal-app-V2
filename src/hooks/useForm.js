import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialState = {}, formValitations = {} ) => {

    const [ formState, setFormState] = useState( initialState );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState])
    
    useEffect(() => {
        setFormState( initialState );
    }, [initialState])
    

    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys(formValidation)) {
            if( formValidation[formValue] !== null) return false;
        }
        return true;

    },[ formValidation]);

    const reset = () =>{
        setValues(initialState);
}

    const handleInputChange = ( { target }) => {
        setFormState({
            ...formState,
            [ target.name ] : target.value
        });

    };

    const createValidators = () => {

        const formCheckValues = {};

        for (const formField of Object.keys( formValitations )) {
            const [ fn, errorMessage = 'Este campo es requerido' ] = formValitations[ formField ];

            formCheckValues[`${ formField }Valid`] = fn( formState[formField] ) ?  null : errorMessage;
        }

        setFormValidation( formCheckValues);

    };

    return {...formState, formState, handleInputChange, reset, ...formValidation, isFormValid};

}