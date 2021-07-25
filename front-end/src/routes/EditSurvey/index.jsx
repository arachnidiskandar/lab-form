import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { Card, CardContent, TextField, Button, Container, Typography, Snackbar } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm, Controller } from 'react-hook-form';
import CheckIcon from '@material-ui/icons/Check';
import LoadingBar from '../../shared/LoadingBar';
import Toaster from '../../shared/Toaster';
import ModalDelete from '../ViewSurveys/ModalDelete';
import useFetch from '../../hooks/UseFetch';

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& .edit-container': {
    display: 'flex',
    alignItems: 'center',
    '& button:first-of-type': {
      margin: '0 10px',
      height: '30px',
      minWidth: '40px',
      width: '40px',
    },
  },
  '& .edit-buttons-container': {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'flex-end',
    '& button:last-child': {
      marginLeft: '20px',
    },
  },
});

const StyledEditFieldContainer = styled('div')({
  marginBottom: '30px',
});

const StyledQuestionContainer = styled('div')({
  h4: {
    marginBottom: '20px',
  },
  '& .MuiCard-root': {
    margin: '15px 0',
  },
});

const StyledDeleteContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

const EditSurvey = () => {
  const [originalSurvey, setOriginalSurvey] = useState(null);
  const [editedSurvey, setEditedSurvey] = useState(null);
  const [toasterState, setToasterState] = useState({ open: false });
  const [isEditingFields, setIsEditingFields] = useState({ title: false, description: false });
  const [isSurveyDifferent, setIsSurveyDifferent] = useState(false);
  const [modalDeleteState, setModalDeleteState] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const surveyId = pathname.split('/')[2];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const [loading, survey, error] = useFetch(`/forms/${surveyId}`);

  useEffect(() => {
    setOriginalSurvey(survey);
    setEditedSurvey(survey);
  }, [survey]);

  const saveEditedField = (field, value) => {
    if (!value && field !== 'description') {
      return;
    }
    setEditedSurvey((prevState) => ({ ...prevState, [field]: value }));
    setIsEditingFields((prevState) => ({ ...prevState, [field]: false }));
  };

  const cancelModifications = () => setEditedSurvey(originalSurvey);

  const closeModalDelete = () => setModalDeleteState(false);

  const setFieldEditing = (field, value) => {
    setIsEditingFields((prevState) => ({ ...prevState, [field]: value }));
    setValue(field, editedSurvey[field]);
  };

  useEffect(() => {
    if (JSON.stringify(originalSurvey) === JSON.stringify(editedSurvey)) {
      setIsSurveyDifferent(false);
    } else {
      setIsSurveyDifferent(true);
    }
  }, [originalSurvey, editedSurvey]);

  const onUpdateSurvey = async () => {
    try {
      await axios.put(`forms/${surveyId}`, {
        title: editedSurvey.title,
        description: editedSurvey.description,
      });
      setToasterState({ open: true, message: 'Questionário Atualizado', type: 'success' });
    } catch (e) {
      setToasterState({ open: true, message: e.message, type: 'error' });
    }
  };
  // transformar num hook
  const onDeleteSurvey = async () => {
    try {
      await axios.delete('/forms/delete', { data: { id: modalDeleteState.id } });
      closeModalDelete();
      history.push('/visualizar-questionarios');
    } catch (e) {
      setToasterState({ open: true, message: e.message, type: 'error' });
    }
  };
  const renderEditButtons = (field) =>
    isEditingFields[field] ? (
      <>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => saveEditedField(field, getValues(field))}
        >
          <CheckIcon />
        </Button>
        <Button variant="contained" size="small" color="primary" onClick={() => setFieldEditing(field, false)}>
          Cancelar
        </Button>
      </>
    ) : (
      <Button variant="contained" size="small" color="primary" onClick={() => setFieldEditing(field, true)}>
        <Edit />
      </Button>
    );
  return (
    <>
      {!loading && (
        <PageContainer>
          <StyledDeleteContainer>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => setModalDeleteState(true)}
            >
              Excluir Questionário
            </Button>
          </StyledDeleteContainer>
          <StyledEditFieldContainer className="edit-container">
            {isEditingFields.title ? (
              <Controller
                control={control}
                name="title"
                rules={{ required: 'Campo Obrigatório' }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    label="Título da pergunta"
                    required
                    helperText={errors?.title && errors.title.message}
                    {...field}
                  />
                )}
              />
            ) : (
              <Typography variant="h4">{editedSurvey?.title}</Typography>
            )}
            {renderEditButtons('title')}
          </StyledEditFieldContainer>
          <StyledEditFieldContainer>
            <div className="edit-container">
              <Typography variant="h4">Descrição:</Typography>
              {renderEditButtons('description')}
            </div>
            {isEditingFields.description ? (
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextField margin="normal" fullWidth variant="outlined" label="Descrição" {...field} />
                )}
              />
            ) : (
              <Typography variant="body1">{editedSurvey?.description}</Typography>
            )}
          </StyledEditFieldContainer>
          {isSurveyDifferent && (
            <div className="edit-buttons-container">
              <Button variant="contained" size="large" color="primary" onClick={() => onUpdateSurvey()}>
                Salvar modificações
              </Button>
              <Button variant="contained" size="large" color="primary" onClick={() => cancelModifications()}>
                Cancelar modificações
              </Button>
            </div>
          )}
          <StyledQuestionContainer>
            <Typography variant="h4">Perguntas:</Typography>
            {originalSurvey &&
              originalSurvey?.questions?.map((question, index) => (
                <Card>
                  <CardContent>
                    <Typography variant="h5">{`${index + 1}- ${question.title}`}</Typography>
                  </CardContent>
                </Card>
              ))}
          </StyledQuestionContainer>
          <Toaster toasterState={toasterState} onClose={() => setToasterState({ open: false })} />
          <ModalDelete
            open={modalDeleteState}
            handleClose={() => closeModalDelete()}
            handleConfirm={() => onDeleteSurvey()}
          />
        </PageContainer>
      )}
      {loading && <LoadingBar isLoadingFinished={loading} />}
    </>
  );
};

export default EditSurvey;
