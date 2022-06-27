import { useMemo, useEffect, useRef } from "react"
import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startSaveNotes, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components/ImageGallery"


export const NoteView = () => {

    const distpatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, handleInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();


    useEffect(() => {
        distpatch(setActiveNote( formState ));
    }, [formState]);

    const onSaveNote = () => {
        distpatch(startSaveNotes());
    };

    useEffect(() => {
        if( messageSaved.length >0 ){
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    },[messageSaved]);

    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;
        
        distpatch( startUploadingFiles(target.files) );
    }


    return (

        <Grid
            className='animated__animated animate_fadeIn animate_faster'
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                mb: 1
            }}
        >
            <Grid item>

                <Typography
                    fontSize={39}
                    fontWeight="light"
                >
                    {dateString}
                </Typography>
            </ Grid>

            <Grid item>

                <input 
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton 
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click() } 
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    disabled={isSaving}
                    onClick={ onSaveNote}
                    color="primary" 
                    sx={{ padding: 2 }}
                    >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Introduce un título"
                    label="Título"
                    sx={{
                        border: 'none',
                        mb: 1,
                    }}
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />


                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    minRows={5}
                    placeholder="¿Qué sucedio en el dia de hoy?"
                    sx={{
                        border: 'none',
                        mb: 1,
                    }}
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                />
            </Grid>

            {
                ( !note.imageUrls )
                ? null
                : <ImageGallery images={note.imageUrls} />
            }

        </Grid>
    )
}
