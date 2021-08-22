import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import Survey from './Survey';
import ModalDelete from './ModalDelete';
import Toaster from '../../shared/Toaster';
import useFetch from '../../hooks/UseFetch';
import LoadingBar from '../../shared/LoadingBar';
import { AuthContext } from '../../context/AuthContext';

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& .survey-list': {
    marginTop: '10vh',
  },
});

const NoSurveyCreatedContainer = styled('div')({
  textAlign: 'center',
  marginTop: '5vh',
  '& h5': {
    marginBottom: '20px',
  },
});

const ViewSurveys = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, surveys] = useFetch(`/forms/filter/${currentUser?.uid}`);
  // const [loading, surveys] = useFetch('/forms');
  const [surveysState, setSurveysState] = useState(surveys);
  const [modalDeleteState, setModalDeleteState] = useState({ open: false });
  const [toasterState, setToasterState] = useState({ open: false });
  const history = useHistory();

  const handleModalDelete = (id) => {
    setModalDeleteState({ open: true, id });
  };

  const closeModalDelete = () => setModalDeleteState({ open: false });

  const closeToaster = () => setToasterState({ open: false });

  const handleDeleteSurvey = async () => {
    try {
      await axios.delete('/forms/delete', { data: { id: modalDeleteState.id } });
      setSurveysState((prevState) => prevState.filter((survey) => survey.id !== modalDeleteState.id));
      closeModalDelete();
      setToasterState({ open: true, message: 'Questionário Deletado', type: 'success' });
    } catch (error) {
      setToasterState({ open: true, message: error.message, type: 'error' });
    }
  };

  const copyLink = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToasterState({ open: true, message: 'Link copiado', type: 'success' });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setSurveysState(surveys);
  }, [surveys]);
  return (
    <>
      <PageContainer>
        <Typography variant="h4">Meus questionários</Typography>
        {surveysState && surveysState.length > 0 ? (
          <div className="survey-list">
            {surveysState &&
              surveysState.map((surveyData) => (
                <Survey key={surveyData.id} data={surveyData} onDeleteClick={handleModalDelete} onCopy={copyLink} />
              ))}
          </div>
        ) : (
          <NoSurveyCreatedContainer>
            <Typography variant="h5">Você ainda não tem nenhum questionário criado</Typography>
            <Button variant="contained" color="primary" onClick={() => history.push('/criar-questionario')}>
              Criar Questionário
            </Button>
          </NoSurveyCreatedContainer>
        )}

        <ModalDelete
          open={modalDeleteState.open}
          handleClose={() => closeModalDelete()}
          handleConfirm={() => handleDeleteSurvey()}
        />
        <Toaster toasterState={toasterState} onClose={closeToaster} />
      </PageContainer>
      {loading && <LoadingBar isLoadingFinished={loading} />}
    </>
  );
};

export default ViewSurveys;
