import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';


export const LoginPage = () => {
  
  // Para error en Firebase
  const { status, errorMessage } = useSelector(state => state.auth);
  

  const dispatch = useDispatch();



  const { email, password, handleInputChange } = useForm({
    email: '',
    password: ''
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }));

  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (

    <AuthLayout
      title='Login'
    >
      <form 
        onSubmit={onSubmit}
        className='animated__animated animate_fadeIn animate_faster'
        >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder='correo@example.com'
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder='Contraseña'
              fullWidth
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

          <Grid 
            display={ !!errorMessage ? '' : 'none'}
            item xs={12} 
            sx={{ mt: 1 }}
            >
            <Alert severity='error'>
              { errorMessage}
            </Alert>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                fullWidth
                onClick={onGoogleSingIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container
            direction='row'
            justifyContent='end'
          >
            <Link
              component={RouterLink}
              color='inherit'
              to='/auth/register'
              sx={{ textDecoration: 'none' }}
            >
              Crear una cuenta

            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>

  )
}
