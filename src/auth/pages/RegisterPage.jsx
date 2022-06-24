import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formData = {
  displayName: '',
  email: '',
  password: '',
}

const formValidations = {
  email: [(value) => value.includes('@'),  'El correo debe contener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener como mínimo 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [ formSubmitted, setFormSubmitted] = useState( false );

  // Para error en Firebase
  const { status, errorMessage} = useSelector( state => state.auth );
  const isCheckingAuthenticacion = useMemo( () => status === 'checking', [status] );
  
  const {
    displayName, email, password, handleInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid }
  = useForm(formData, formValidations )



  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted( true );
    if( !isFormValid) return;

    dispatch( startCreatingUserWithEmailPassword( { displayName, email, password} ) );

  }

  return (
    <AuthLayout
      title='Crear cuenta'
    >
      <form 
        className='animated__animated animate_fadeIn animate_faster'
        onSubmit={onSubmit}
        >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Apellidos"
              type="text"
              placeholder='Su nombre'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={handleInputChange}
              error={!!displayNameValid && formSubmitted }
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder='correo@example.com'
              fullWidth
              name='email'
              value={email}
              onChange={handleInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={handleInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
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

            <Grid item xs={12} sx={{ mt: 1 }}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={ isCheckingAuthenticacion}
              >
                Crear cuenta
              </Button>
            </Grid>
            <Grid container
              sx={{ mt: 1, }}
              direction='row'
              justifyContent='end'
            >
              <Typography>¿Ya tienes cuenta?</Typography>
              <Link
                component={RouterLink}
                color='inherit'
                to='/auth/login'
                sx={{ ml: 1, textDecoration: 'none' }}
              >
                Ingresar

              </Link>
            </Grid>

          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
