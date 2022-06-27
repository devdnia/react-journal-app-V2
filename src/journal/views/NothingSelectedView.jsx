import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Grid 
      className='animated__animated animate_fadeIn animate_faster'
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc( 100vh - 110px)', backgroundColor: 'white', borderRadius:3 }}
    >
      <Grid item
      xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'yellow', opacity: 0.4 }}/>
      </Grid>
      <Grid item
      xs={12}>
        <Typography color="secondary" variant='h5'>Selecciona o crea una entrada</Typography>
      </Grid>
    </Grid>
  )
}
