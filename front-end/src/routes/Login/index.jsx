import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link as RouterLink } from 'react-router-dom';

import { Card, CardContent, TextField, Button, Link, makeStyles, Typography, Container } from '@material-ui/core';
// import { toast } from 'react-toastify';
import { styled } from '@material-ui/core/styles';
import { fb } from '../../config/Fire';
import LoadingBar from '../../shared/LoadingBar';

const PageContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  '& form': {
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
  },
  '& button': {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    fontSize: '18px',
  },
  '& .MuiTextField-root ': {
    margin: '10px 0',
  },
  '& .MuiCard-root': {
    width: '550px',
    padding: '1%',
  },
});

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setError, errors } = useForm();
  // const errorFieldMessage = (propName) => (errors[propName] ? errors[propName].message : '');

  const onSubmit = (data) => {
    setLoading(true);
    fb.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        fb.auth().onAuthStateChanged((user) => (user ? history.push('/home') : null));
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          setError('email', {
            type: 'manual',
            message: 'Usuário não encontrado',
          });
        } else if (err.code === 'auth/wrong-password') {
          setError('password', {
            type: 'manual',
            message: 'Senha incorreta',
          });
        }
        // toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <PageContainer>
      <Card>
        <CardContent>
          <h2>Login</h2>
          <form id="form-login" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <TextField
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: { value: true, message: 'Email inválido' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email Inválido',
                },
              })}
              error={errors?.email}
              // helperText={errorFieldMessage('email')}
              label="Email"
              variant="outlined"
            />
            <TextField
              autoComplete="current-password"
              {...register('password', {
                required: { value: true, message: 'Senha Inválida' },
              })}
              error={errors?.password}
              // helperText={errorFieldMessage('password')}
              type="password"
              label="Senha"
              variant="outlined"
            />
          </form>
          <Typography>
            <Link component={RouterLink} to="/criar-conta">
              Não possui uma conta? Cadastre-se aqui
            </Link>
          </Typography>

          <Button type="submit" form="form-login" variant="contained" color="primary">
            Entrar
          </Button>
        </CardContent>
      </Card>
      {loading && <LoadingBar isLoadingFinished={loading} />}
    </PageContainer>
  );
};

export default Login;
