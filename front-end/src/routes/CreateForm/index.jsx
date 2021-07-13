import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Container, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { styled } from '@material-ui/core/styles';
import { useForm, useFieldArray } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
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

const CreateForm = () => {
  const [openModal, setOpenModal] = useState(false);
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

  const onSubmit = (data) => {
    if (data.questions.length === 0) {
      setError('questions', { type: 'manual', message: 'É necessário pelo menos uma pergunta' });
    }
    setOpenModal(true);
  };

  const addQuestion = () => {
    clearErrors('questions.type');
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
      <ModalShare open={openModal} handleClose={() => setOpenModal(false)} />
    </PageContainer>
  );
};

export default CreateForm;