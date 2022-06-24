import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"


export const NoteView = () => {
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
                    fontSize={ 39 }
                    fontWeight="light"
                >
                    16 de Junio 2022
                </Typography>
            </ Grid>

            <Grid item>
                <Button color="primary" sx={{ padding: 2}}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}}/>
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
                />
                </Grid>    

                <ImageGallery />
        </Grid>
    )
}
