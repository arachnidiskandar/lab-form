import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Container, Typography, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { styled } from '@material-ui/core/styles';
import { useForm, useFieldArray } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import Question from './Question';
import ModalShare from './ModalShare';

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& form': {
    display: 'flex',
    flexDirection: 'column',
  },
  '& h4': {
    marginBottom: '20px',
  },
  '& .MuiButton-outlined': {
    width: '50%',
    alignSelf: 'center',
    marginTop: '20px',
    marginBottom: '40px',
  },
  '& .MuiButton-containedSizeLarge': {
    width: '80%',
    alignSelf: 'center',
  },
  '& .MuiAlert-standardError': {
    margin: '20px 0',
  },
});

const CreateSurvey = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      questions: [{ questionTitle: '', questionType: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data) => {
    if (data.questions.length === 0) {
      setError('questions', { message: 'É necessário pelo menos uma pergunta' });
      return;
    }
    try {
      const response = await axios.post('/forms/create', data);
      setOpenModal(true);
    } catch (error) {
      setErrorState(error);
    }
  };

  const addQuestion = () => {
    clearErrors('questions.message');
    clearErrors('questions.ref');
    append({ questionTitle: '', questionType: '' });
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Card>
          <CardContent>
            <Typography variant="h4">Crie o seu questionário</Typography>
            <TextField
              error={!!errors?.title}
              margin="normal"
              fullWidth
              variant="outlined"
              label="Título do questionário"
              type="text"
              {...register('title', { required: 'Campo obrigatório' })}
              helperText={errors?.title?.message}
              required
            />
            <TextField
              {...register('description')}
              margin="normal"
              fullWidth
              multiline
              variant="outlined"
              label="Descrição"
              type="text"
            />
          </CardContent>
        </Card>
        {fields.map((item, index) => {
          return (
            <Question
              key={item.id}
              index={index}
              register={register}
              item={item}
              control={control}
              deleteQuestion={remove}
              error={errors?.questions}
            />
          );
        })}
        {fields.length === 0 && errors?.questions?.message && (
          <Alert severity="error">{errors.questions.message}</Alert>
        )}
        <Button onClick={addQuestion} variant="outlined" size="large" color="primary" startIcon={<AddIcon />}>
          Adicionar outra pergunta
        </Button>
        <Button type="submit" variant="contained" size="large" color="primary">
          Finalizar questionário
        </Button>
      </form>
      <Snackbar open={errorState} autoHideDuration={5000}>
        <Alert onClose={() => setErrorState(null)} severity="error" elevation={6} variant="filled">
          {errorState?.message}
        </Alert>
      </Snackbar>
      <ModalShare open={openModal} handleClose={() => setOpenModal(false)} />
    </PageContainer>
  );
};

export default CreateSurvey;
