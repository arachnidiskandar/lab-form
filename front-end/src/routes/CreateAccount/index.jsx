import React, { useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';

import { TextField, Button, Link, Card, CardContent, Typography, Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';
import { fb } from '../../config/Fire';
import Toaster from '../../shared/Toaster';
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

const CreateAccount = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [toasterState, setToasterState] = useState({ open: false });

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    fb.auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        fb.auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(() => {
            history.push(`/visualizar-questionarios`);
            setToasterState({ open: true, message: 'Cadastro realizado com sucesso!', type: 'success' });
          })
          .catch((e) => setToasterState({ open: true, message: e.message, type: 'error' }));
      })
      .catch((e) => setToasterState({ open: true, message: e.message, type: 'error' }))
      .finally(() => setLoading(false));
  };
  const requiredField = { value: true, message: 'Campo obrigatório' };

  return (
    <PageContainer>
      <Card>
        <CardContent>
          <h2>Cadastro</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <TextField
              autoComplete="email"
              label="Email"
              variant="outlined"
              {...register('email', {
                required: requiredField,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email Inválido',
                },
              })}
              error={!!errors?.email}
              // helperText={errorFieldMessage('email')}
              required
            />

            <TextField
              type="password"
              autoComplete="new-password"
              label="Senha"
              variant="outlined"
              {...register('password', {
                required: requiredField,
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
              error={!!errors?.password}
              // helperText={
              //   errors.password
              //     ? errorFieldMessage('password')
              //     : 'Mínimo 6 caracteres'
              // }
              required
            />
            <TextField
              type="password"
              label="Confirme sua senha"
              variant="outlined"
              error={!!errors?.confirmPass}
              {...register('confirmPass', {
                required: requiredField,
                validate: (value) => value === watch('password'),
              })}
              // helperText={
              //   errors.confirmPass?.type === 'validate'
              //     ? 'Senhas não Coincidem'
              //     : errorFieldMessage('confirmPass')
              // }
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </form>
          <Typography>
            <Link component={RouterLink} to="/login">
              <span>Já Possui uma conta? Faça Login</span>
            </Link>
          </Typography>
        </CardContent>
      </Card>
      {loading && <LoadingBar isLoadingFinished={loading} />}
      <Toaster toasterState={toasterState} onClose={() => setToasterState({ open: false })} />
    </PageContainer>
  );
};

export default CreateAccount;
